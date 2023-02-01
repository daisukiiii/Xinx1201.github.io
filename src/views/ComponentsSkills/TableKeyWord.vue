<template>
  <div>
    <div class="flex-row">
      <span class="w80 font">关键字:</span>
      <el-input v-model="keyWorld" placeholder="请输入关键字"></el-input>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="address" label="地址">
        <template slot-scope="scope">
          <span v-html="showDate(scope.row.address)"></span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TableKeyWord',
  data() {
    return {
      keyWorld: '',
      tableData: [
        { address: '上海市普陀区金沙江路 1511 弄' },
        { address: '上海市普陀区金沙江路 1512 弄' },
        { address: '上海市普陀区金沙江路 1513 弄' },
      ],
    };
  },
  methods: {
    showDate(val) {
      if (val.indexOf(this.keyWorld) !== -1 && this.keyWorld !== '') {
        return val.replace(
          this.keyWorld,
          '<font color="#f00">' + this.keyWorld + '</font>'
        );
      } else {
        return val;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.font {
  color: #909399;
}
</style>
