<template>
  <div>
    <el-table
      row-key="id"
      ref="multipleTable"
      :data="tableData"
      :span-method="MergerArrowRow"
      style="width: 100%; height: 100%; overflow: auto"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="date" align="center" label="日期">
      </el-table-column>
      <el-table-column prop="name" align="center" label="姓名">
        <template slot-scope="scope">
          <div
            style="text-align: left"
            v-if="scope.row.children && scope.row.children.length"
          >
            <span
              v-if="!scope.row.expanded"
              class="el-icon-caret-right"
              style="cursor: pointer"
              @click="onClickOpen(scope.row)"
            >
              {{ scope.row.type }}
            </span>
            <span
              v-else
              class="el-icon-caret-bottom"
              style="cursor: pointer"
              @click="onClickOpen(scope.row)"
            >
              {{ scope.row.type }}
            </span>
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
      tableData: [
        {
          id: 1,
          type: '省',
          expanded: false,
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
            },
          ],
        },
        {
          id: 2,
          type: '市',
          expanded: false,
          children: [
            {
              id: 31,
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
    MergerArrowRow({ row, column, rowIndex, columnIndex }) {
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
