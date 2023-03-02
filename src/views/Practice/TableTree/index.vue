<template>
  <el-table
    :data="tableData"
    :cell-style="{ textAlign: 'center' }"
    :header-cell-style="{ textAlign: 'center' }"
    row-key="id"
    :tree-props="{ children: 'children' }"
    :expand-row-keys="expands"
    @expand-change="expandSelect"
  >
    <el-table-column prop="id" label="ID" width="120"> </el-table-column>
    <el-table-column prop="date" label="日期" width="200">
      <template slot-scope="scope">
        <template v-if="scope.row.isEdit">
          <el-input clearable v-model="scope.row.date"></el-input>
        </template>
        <template v-else>{{ scope.row.date }}</template>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="200">
      <template slot-scope="scope">
        <template v-if="scope.row.isEdit">
          <el-input clearable v-model="scope.row.name"></el-input>
        </template>
        <template v-else>{{ scope.row.name }}</template>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="地址">
      <template slot-scope="scope">
        <template v-if="scope.row.isEdit">
          <el-input clearable v-model="scope.row.address"></el-input>
        </template>
        <template v-else>{{ scope.row.address }}</template>
      </template>
    </el-table-column>
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
        <el-button size="mini" type="danger" @click="onClickRemove(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'TableTree',
  data() {
    return {
      isEdit: false, // 是否正在编辑
      source: undefined, // 源数据
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
    // 只允许展开一行
    expandSelect(row) {
      this.expands = [];
    },
    onClickAdd(row) {
      this.expands.push(row.id);
      if (row.children && row.children.length) {
        // 防止id重复导致前端报错
        // 每次都取数组中最后一位的id 自增
        let num = row.children[row.children.length - 1].id.split(':')[1];
        row.children.push({
          id: `${row.id}:${++num}`,
          isSecond: true,
          date: '',
          name: '',
          address: '',
        });
      } else {
        this.$set(row, 'children', []);
        row.children.push({
          id: `${row.id}:1`,
          isSecond: true,
          date: '',
          name: '',
          address: '',
        });
      }
    },
    onClickEdit(row) {
      if (this.isEdit) {
        this.$message({
          type: 'warning',
          message: '请先保存后在修改!',
        });
        return;
      }
      this.isEdit = true; // 点击修改按钮 后 更改isEdit状态，全局判断是否有再次点击的修改按钮
      this.$set(row, 'isEdit', true);
      // 深拷贝
      this.source = JSON.parse(JSON.stringify(row));
    },

    // 取消操作
    onClickCancel(row) {
      this.isEdit = false;
      // 取消编辑
      this.$set(row, 'isEdit', false);
      // 并且恢复原来的值
      if (row.isSecond) {
        // 如果是取消第二行的数据 走该逻辑
        Object.assign(row, this.source);
        row.isEdit = false;
      } else {
        let index = this.tableData.findIndex((x) => x.id == row.id);
        let source = this.source;
        source.isEdit = false;
        this.tableData.splice(index, 1, source);
      }
    },

    onClickFinish(row) {
      this.isEdit = false;
      this.$set(row, 'isEdit', false);
    },

    // 删除行
    onClickRemove(row) {
      this.$confirm('此操作将删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          if (row.isSecond) {
            // 如果是删除第二行的数据 走该逻辑
            // id 是固定的，所以可以根据id删除对应的数据
            this.tableData.forEach((item, index) => {
              if (item.children && item.children.length) {
                let sourceIndex = item.children.findIndex(
                  (x) => x.id == row.id
                );
                // 找到行
                if (sourceIndex != -1) {
                  this.tableData[index].children.splice(sourceIndex, 1);
                }
              }
            });
          } else {
            let index = this.tableData.findIndex((x) => x.id == row.id);
            this.tableData.splice(index, 1);
          }
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
