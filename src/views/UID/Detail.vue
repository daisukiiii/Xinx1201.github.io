<template>
  <el-table :data="tableData" border stripe style="width: 100%">
    <el-table-column align="center" prop="horse" label="成马">
      <template slot-scope="scope">
        <span>{{ scope.row.horse }}</span>
        <span v-if="scope.row.suffix">·{{ scope.row.suffix }}</span>
        <span class="doubleRider" v-if="scope.row['双骑']">双</span>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="uid" label="UID">
      <template slot-scope="scope">
        <copyable :value="scope.row.uid" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="属性">
      <template slot-scope="scope">
        <span
          v-html="
            $options.filters.filterKeyWord(scope.row.attr.join(' / '), '劲足')
          "
        ></span>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="移速" label="移速" width="90" />
    <el-table-column
      align="center"
      prop="马术气力"
      label="马术气力"
      width="90"
    />
    <el-table-column
      align="center"
      prop="恢复增加"
      label="恢复增加"
      width="90"
    />
    <el-table-column
      align="center"
      prop="消耗降低"
      label="消耗降低"
      width="90"
    />
    <el-table-column
      align="center"
      prop="恢复速度"
      label="恢复速度"
      width="90"
    />
    <el-table-column align="center" prop="抗摔" label="抗摔" width="90" />
  </el-table>
</template>

<script>
export default {
  naem: 'HouseDetail',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    data() {
      return {};
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.doubleRider {
  background-color: #fb700d;
  color: #fff;
  padding: 3px;
  margin-left: 5px;
}
</style>
