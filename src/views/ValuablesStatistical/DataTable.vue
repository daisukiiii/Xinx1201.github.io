<template>
  <div>
    <el-table :data="tableData" style="width: 100%" height="80vh">
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column prop="time" label="时间" sortable align="center">
        <template slot-scope="scope">
          {{ (scope.row.time * 1000) | dateToString('datetime') }}
        </template>
      </el-table-column>
      <el-table-column prop="server" label="服务器" align="center">
      </el-table-column>
      <el-table-column prop="role" label="获得角色" align="center">
      </el-table-column>
      <el-table-column prop="name" label="物品" align="center">
      </el-table-column>
      <el-table-column prop="map" label="地图" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ForcastDataTable',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<style lang="scss"></style>
