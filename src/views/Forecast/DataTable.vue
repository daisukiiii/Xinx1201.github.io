<template>
  <div>
    <el-table
      :data="
        filterZone
          ? filterServer
            ? tableData
                .filter((x) => x.zone == filterZone)
                .filter((x) => x.server == filterServer)
            : tableData.filter((x) => x.zone == filterZone)
          : filterServer
          ? tableData.filter((x) => x.server == filterServer)
          : tableData
      "
      style="width: 100%"
      height="70vh"
      @selection-change="handleSelectionChange"
      :cell-class-name="delLine"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="originTime" label="记录时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.originTime | dateToString('datetime') }}
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header">
          <div>区服</div>
          <div>
            <el-select
              v-model="filterZone"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in [...new Set(tableData.map((x) => x.zone))]"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </template>
        <template slot-scope="scope">
          {{ scope.row.zone }}
        </template>
      </el-table-column>
      <el-table-column prop="server" label="服务器" align="center">
        <template slot="header">
          <div>服务器</div>
          <div>
            <el-select
              v-model="filterServer"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in filterZone
                  ? [...new Set(tableData.map((x) => x.server))].filter((x) =>
                      serverList
                        .find((x) => x.zone == filterZone)
                        .servers.includes(x)
                    )
                  : [...new Set(tableData.map((x) => x.server))]"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </template>
        <template slot-scope="scope">
          {{ scope.row.server }}
        </template>
      </el-table-column>
      <el-table-column prop="map" label="地图" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" align="center">
        <template slot-scope="scope">
          <span v-html="$options.filters.filterKeyWord(scope.row.type)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="刷马时间" sortable align="center">
        <template slot-scope="scope">
          {{ scope.row.endTime | dateToString('datetime') }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" class="mgr10" @click="copy(scope.row)"
            >复制</el-button
          >
          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除该条刷马信息？"
            @confirm="onClickDel(scope.row)"
          >
            <el-button size="mini" slot="reference" type="danger"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { randomInt } from '@/utils';
import serverList from '@/assets/data/server.json';
import emoticons from '@/assets/data/emoticons.json';
export default {
  name: 'ForcastDataTable',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      emoticons, // 颜文字表情
      serverList,

      filterZone: '', // 筛选大区
      filterServer: '', // 筛选服务器
    };
  },
  methods: {
    // 删除线
    delLine({ row, column, rowIndex, columnIndex }) {
      if (row.overTime == 5) {
        return 'del_line';
      }
    },
    // 多选框
    handleSelectionChange(val) {
      this.$emit('selection', val);
    },
    // 复制
    copy(row) {
      let randomEmoji = this.emoticons[randomInt(0, this.emoticons.length)];
      let oInput = document.createElement('input');
      // 将想要复制的值
      oInput.value = `【${
        row.server
      }】将于 ${this.$options.filters.dateToString(
        row.endTime,
        'datetime'
      )} 在 ${row.map} 刷新马驹 ${row.type
        .split('/')
        .join('\\')} ${randomEmoji}`;
      // 页面底部追加输入框
      document.body.appendChild(oInput);
      // 选中输入框
      oInput.select();
      // 执行浏览器复制命令
      document.execCommand('Copy');
      // 弹出复制成功信息
      this.$message.success('复制成功');
      // 复制后移除输入框
      oInput.remove();
    },
    // 删除信息
    onClickDel(row) {
      let index = this.tableData.findIndex((x) => x == row);
      console.log(index);
      this.tableData.splice(index, 1);
    },
  },
};
</script>
<style lang="scss">
.del_line {
  &:after {
    content: no-open-quote;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
}
</style>
<style lang="scss" scoped></style>
