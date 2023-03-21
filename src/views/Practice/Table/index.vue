<template>
  <div>
    <div>
      <el-button @click="onClickLocation">定位</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" ref="multipleTable">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" align="center"> </el-table-column
      ><el-table-column prop="date" label="日期" align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scoped">
          <el-button size="mini" @click="onClickEdit(scoped.row)"
            >修改</el-button
          >
          <el-button size="mini" @click="onClickDel(scoped.row)" type="danger"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      rowPosition: {}, // 定位行数据
      windowScroll: 0, // 定位行高度
    };
  },
  mounted() {
    this.createData();
  },
  methods: {
    // 假数据
    createData() {
      this.tableData = [];
      for (let i = 0; i < 35; i++) {
        this.tableData.push({
          id: i + 1,
          date: `${new Date(2021, 0, i + 1).toLocaleDateString()}`,
          name: '小虎',
          address: `浙江省杭州市西湖区${i + 1}号`,
        });
      }
    },
    // 定位
    onClickLocation() {
      console.log('点击了定位');
    },

    // 修改
    onClickEdit(row) {
      console.log(row.id);
      this.rowPosition = row;
    },

    // 删除
    onClickDel(row) {
      console.log('删除数据');
      let index = this.tableData.indexOf(row);
      this.tableData.splice(index, 1);
    },
  },
};
</script>
<style lang="scss" scoped></style>
