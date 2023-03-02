<template>
  <el-table
    :data="tableData.filter((x) => x.children.length)"
    border
    stripe
    style="width: 100%"
    @row-click="rowClick"
    height="80vh"
    ref="table"
    :span-method="objectSpanMethod"
  >
    <el-table-column align="center" prop="horse" label="马驹" width="180">
      <template slot-scope="scope">
        {{ scope.row.horse }}
        <el-tooltip
          v-if="scope.row.suffix"
          effect="dark"
          :content="getMap(scope.row.suffix)"
          placement="top"
        >
          <span>·{{ scope.row.suffix }}</span>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column type="expand">
      <template slot-scope="scope">
        <Detail :table-data="scope.row.children" />
      </template>
    </el-table-column>
    <el-table-column align="center" prop="level" label="等级" width="80" />
    <el-table-column align="center" prop="uid" label="UID" width="180">
      <template slot-scope="scope">
        <copyable :value="scope.row.uid" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="劲足属性">
      <template slot-scope="scope">
        <span
          v-html="
            $options.filters.filterKeyWord(
              simpleInfo(scope.row.children),
              '劲足'
            )
          "
        ></span>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      prop="successRate"
      label="成功率"
      width="120"
    >
    </el-table-column>
  </el-table>
</template>

<script>
import Detail from './Detail.vue';
import horseMapOptions from '@/assets/data/horseMap.json';
export default {
  name: 'UIDDataTable',
  components: {
    Detail,
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    data() {
      return {
        horseMapOptions,
      };
    },
  },
  computed: {},
  methods: {
    // 马驹对应地图
    getMap(val) {
      let map = horseMapOptions.find((x) => x.type == '马场').positions;
      if (map.find((x) => x.suffix == val)) {
        return map.find((x) => x.suffix == val).map;
      } else {
        return;
      }
      return;
    },
    // 展示精简信息
    simpleInfo(row) {
      let info = '';
      row.forEach((x, index) => {
        if (x.attr.find((x) => x.includes('劲足'))) {
          info += x.uid + ' ';
          info +=
            x.horse +
            (x.suffix ? '·' + x.suffix : '') +
            ' ' +
            (x['双骑'] ? '[双]' : '');
          info += `【${x.attr}】${row.length - 1 == index ? '' : ' '}\n`;
        }
      });
      return info;
    },
    // 点击行 展示详情信息
    rowClick(row, column, event) {
      // 复制uid不允许展开行
      if (column.property == 'uid') return;
      this.$refs.table.toggleRowExpansion(row);
    },

    // objectSpanMethod方法
    // 默认接受四个值 { 当前行的值, 当前列的值, 行的下标, 列的下标 }
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        console.log(row);
        let spanArr = this.getSpanArr(this.tableData, 'horse', 'suffix');
        const _row = spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    // 处理合并行的数据
    getSpanArr(data, spanKey, suffix) {
      let that = this;
      let spanArr = [];
      let pos = '';
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          spanArr.push(1);
          pos = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          // 马驹名称&前缀都相同的情况下才合并
          if (
            data[i][spanKey] === data[i - 1][spanKey] &&
            data[i][suffix] === data[i - 1][suffix]
          ) {
            spanArr[pos] += 1;
            spanArr.push(0);
          } else {
            spanArr.push(1);
            pos = i;
          }
        }
      }
      return spanArr;
    },
  },
};
</script>

<style>
.el-table .cell {
  white-space: pre-wrap; /*这是重点。文本换行*/
}
</style>
