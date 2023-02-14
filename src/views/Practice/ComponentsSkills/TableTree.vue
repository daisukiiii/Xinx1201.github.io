<template>
  <div>
    <el-table
      row-key="id"
      ref="multipleTable"
      :data="tableData"
      :span-method="MergerArrowRow"
      @select-all="selectAll"
      @select="select"
      style="width: 100%; height: 100%; overflow: auto"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="date" align="center" label="日期">
      </el-table-column>
      <el-table-column prop="name" align="center" label="姓名">
        <template slot-scope="scope">
          <div v-if="!scope.row.show">
            <div
              style="text-align: left"
              v-if="scope.row.children && scope.row.children.length"
            >
              <span
                v-if="!scope.row.expanded"
                class="el-icon-arrow-right"
                style="cursor: pointer"
                @click="onClickOpen(scope.row)"
              >
                {{ scope.row.type }}
              </span>
              <span
                v-else
                class="el-icon-arrow-down"
                style="cursor: pointer"
                @click="onClickOpen(scope.row)"
              >
                {{ scope.row.type }}
              </span>
            </div>
            <div v-else>
              {{ scope.row.name }}
            </div>
          </div>
          <div v-else>
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column type="selection"> </el-table-column>
    </el-table>
  </div>
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
          type: '省',
          expanded: false,
          children: [
            {
              id: 11,
              date: '2016-05-11',
              show: true,
              name: '王小虎',
              children: [
                {
                  id: 111,
                  date: '2016-05-12',
                  name: '王小虎',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          type: '市',
          expanded: false,
          children: [
            {
              id: 21,
              date: '2016-05-01',
              name: '王小虎',
            },
          ],
        },
        {
          id: 3,
          type: '区',
          expanded: false,
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
            },
          ],
        },
      ],
    };
  },
  methods: {
    onClickOpen(row) {
      row.expanded = !row.expanded;
      this.$refs.multipleTable.toggleRowExpansion(row);
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
        this.$refs.multipleTable.toggleRowSelection(item, selected);
        if (item.children && item.children.length) {
          this.checkAll(item.children, selected);
        }
      });
    },

    // 合并单元格
    MergerArrowRow({ row, column, rowIndex, columnIndex }) {
      if (row.show) return;
      // 如果该行是有children的父行。 进行合并行
      if (row.children) {
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
