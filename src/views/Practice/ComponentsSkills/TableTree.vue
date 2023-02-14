<template>
  <el-table
    :data="tableData"
    row-key="id"
    style="overflow: auto"
    ref="multipleTable"
    @select="select"
    @select-all="selectAll"
    :tree-props="{ children: 'children' }"
    :span-method="MergerArrowRow"
  >
    <el-table-column type="selection"></el-table-column>
    <el-table-column prop="date" label="日期" width="160">
      <template slot-scope="scope">
        <span v-if="scope.row.type">{{ scope.row.type }}</span>
        <span v-else>{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="姓名"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'TableTree',
  data() {
    return {
      isSelectAll: false,
      tableData: [
        {
          id: 1,
          type: '年',
          children: [
            {
              id: 11,
              date: '2016-05-11',
              name: '王小虎',
              children: [
                {
                  id: 111,
                  date: '2016-05-111',
                  name: '王小虎',
                },
              ],
            },
            {
              id: 12,
              date: '2016-05-12',
              name: '王小虎',
              children: [
                {
                  id: 121,
                  date: '2016-05-121',
                  name: '王小虎',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          type: '月',
          children: [
            {
              id: 21,
              date: '2016-05-21',
              name: '王小虎',
              children: [
                {
                  id: 211,
                  date: '2016-05-211',
                  name: '王小虎',
                },
              ],
            },
            {
              id: 22,
              date: '2016-05-22',
              name: '王小虎',
              children: [
                {
                  id: 221,
                  date: '2016-05-221',
                  name: '王小虎',
                },
              ],
            },
          ],
        },
        {
          id: 3,
          type: '日',
          children: [
            {
              id: 31,
              date: '2016-05-31',
              name: '王小虎',
              children: [
                {
                  id: 311,
                  date: '2016-05-311',
                  name: '王小虎',
                },
              ],
            },
            {
              id: 32,
              date: '2016-05-32',
              name: '王小虎',
              children: [
                {
                  id: 321,
                  date: '2016-05-321',
                  name: '王小虎',
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
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
        this.$refs.multipleTable.toggleRowSelection(item, selected);
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
          return [1, 3];
        } else {
          return [0, 0];
        }
      }
    },
  },
};
</script>

<style lang="scss"></style>
