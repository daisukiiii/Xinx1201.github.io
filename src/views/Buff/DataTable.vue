<template>
  <div>
    <el-table
      border
      stripe
      row-key="id"
      :data="tableData"
      height="80vh"
      style="width: 100%"
      @select="select"
      @select-all="selectAll"
      @row-click="rowClick"
      :tree-props="{ children: 'children' }"
      :span-method="MergerArrowRow"
      ref="table"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column width="1">
        <template slot-scope="scope">
          <span v-if="scope.row.type">{{ scope.row.type }}</span>
          <el-tag
            class="mgl10"
            effect="plain"
            type="success"
            v-if="scope.row.children"
            >{{ scope.row.children.length }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center" width="260">
        <template slot-scope="scope">
          <span v-if="scope.row.type">{{ scope.row.type }}</span>
          <span v-else>
            <div>{{ scope.row.name }}</div>
            <div class="nickName">{{ scope.row.nickName }}</div>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="Buff ID" align="center" width="100">
        <template slot-scope="scope">
          <copyable
            :value="
              scope.row.id.toString().indexOf('_') == '-1'
                ? scope.row.id
                : scope.row.id.toString().split('_')[0]
            "
          />
        </template>
      </el-table-column>
      <el-table-column prop="Level" label="等级" align="center" width="80">
      </el-table-column>
      <el-table-column prop="Desc" label="描述" align="center">
      </el-table-column>
      <el-table-column
        prop="MaxStackNum"
        label="最大叠加层数"
        align="center"
        width="120"
      >
      </el-table-column>
      <el-table-column label="是否叠加" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.IsStackable | BooleanTranslate }}
        </template>
      </el-table-column>
      <el-table-column label="作用间隔" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.Interval | frameTransformTime }}
        </template>
      </el-table-column>
      <el-table-column label="作用次数" align="center" width="80">
        <template slot-scope="scope"> {{ scope.row.Count }} 次 </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'BuffDataTable',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isSelectAll: false,
    };
  },
  computed: {},
  methods: {
    rowClick(row, column, event) {
      this.$refs.table.toggleRowExpansion(row);
    },
    select(selection, row) {
      let status = selection.find((x) => x.name == row.name);
      if (row.children && row.children.length) {
        this.checkAll(row.children, status);
      }
    },

    // 表头全选
    selectAll() {
      this.isSelectAll = !this.isSelectAll;
      // 完全可以使用【递归全选】
      this.checkAll(this.tableData, this.isSelectAll);
    },

    // 递归全选
    checkAll(data, selected) {
      data.forEach((item) => {
        this.$refs.table.toggleRowSelection(item, selected);
        if (item.children && item.children.length) {
          this.checkAll(item.children, selected);
        }
      });
    },
    // 合并单元格
    MergerArrowRow({ row, column, rowIndex, columnIndex }) {
      // if (row.type) return;
      // 如果该行是有children的父行。 进行合并行
      if (row.children && row.type) {
        if (columnIndex == 1) {
          return [1, 10];
        } else {
          return [0, 0];
        }
      }
    },
  },
};
</script>
<style lang="scss">
.nickName {
  color: #ccc;
  font-size: 10px;
}
</style>
