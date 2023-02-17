<template>
  <el-table
    :data="tableData"
    :cell-style="{ textAlign: 'center' }"
    :header-cell-style="{ textAlign: 'center' }"
    row-key="date"
    :tree-props="{ children: 'children' }"
    :expand-row-keys="expands"
    style="width: 100%"
  >
    <el-table-column prop="date" label="日期" width="180">
      <template slot-scope="scope">
        <template v-if="scope.row.isEdit">
          <el-input v-model="scope.row.date"></el-input>
        </template>
        <template v-else>{{ scope.row.date }}</template>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="180">
      <template slot-scope="scope">
        <template v-if="scope.row.isEdit">
          <el-input v-model="scope.row.name"></el-input>
        </template>
        <template v-else>{{ scope.row.name }}</template>
      </template>
    </el-table-column></el-table-column>
    <el-table-column prop="address" label="地址">
      <template slot-scope="scope">
        <template v-if="scope.row.isEdit">
          <el-input v-model="scope.row.address"></el-input>
        </template>
        <template v-else>{{ scope.row.address }}</template>
      </template>
    </el-table-column></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          v-if="!scope.row.isSecond"
          @click="onClickAdd(scope.row)"
          >添加</el-button
        >
        <el-button
          size="mini"
          @click="onClickEdit(scope.row)"
          v-if="!scope.row.isEdit"
          >修改</el-button
        >
        <el-button
          size="mini"
          @click="onClickFinish(scope.row)"
          v-if="scope.row.isEdit"
          >完成</el-button
        >
        <el-button
          size="mini"
          @click="onClickCancel(scope.row)"
          v-if="scope.row.isEdit"
          >取消</el-button
        >
        <el-button size="mini" type="danger">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'TableTree',
  data() {
    return {
      source:undefined, // 源数据
      expands: [],
      tableData: [
        {
          id: '1',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          id: '2',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          id: '3',
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
      ],
    };
  },
  methods: {
    onClickAdd(row) {
      this.expands = [];
      this.expands.push(row.date);
      console.log(row);
      if (row.children) {
        console.log('当前数据有孩子节点，直接push进去一个空对象');
        row.children.push({
          isSecond: true,
          date: '',
          name: '',
          address: '',
        });
      } else {
        console.log('当前数据没有孩子，初始化children,并push进去一个空对象');
        this.$set(row, 'children', []);
        row.children.push({
          isSecond: true,
          date: '',
          name: '',
          address: '',
        });
      }
    },
    onClickEdit(row) {
      this.$set(row, 'isEdit', true);
      // 深拷贝
      this.source = JSON.parse(JSON.stringify(row));
    },

    // 取消操作
    onClickCancel(row){
      // 取消编辑
      this.$set(row, 'isEdit', false);
      // 并且恢复原来的值
      console.log('row',row);

    },
    
    onClickFinish(row){
      this.$set(row, 'isEdit', false);
    }
  },
};
</script>

<style lang="scss" scoped></style>
