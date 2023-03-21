<template>
  <div>
    <el-table :data="tableData" style="width: 100%" height="80vh">
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
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<style lang="scss"></style>
