<template>
  <div class="flex-column flex-ai-stretch">
    <!-- 顶部筛选框 -->
    <Operation @select="select" ref="operation" class="flex-none" />
    <!-- 底部Table -->
    <div class="flex-row">
      <span>总共 {{ tableData.length }} / {{ valuablesData.length }} 项</span>
      <div class="flex-auto"></div>
    </div>
    <DataTable
      @selection="selection"
      :tableData="tableData"
      class="flex-auto"
    />
  </div>
</template>

<script>
import Operation from './Operation.vue';
import DataTable from './DataTable.vue';
import valuablesData from '@/assets/data/太一玄晶.json';

export default {
  components: {
    Operation,
    DataTable,
  },
  data() {
    return {
      form: {}, // 筛选项
      valuablesData,

      multipleSelection: [], // 多选数据
    };
  },
  computed: {
    tableData() {
      if (this.form.role) {
        if (this.form.map) {
          return this.valuablesData
            .filter((x) => x.role == this.form.role)
            .filter((x) => x.map == this.form.map);
        } else {
          return this.valuablesData.filter((x) => x.role == this.form.role);
        }
      } else if (this.form.map) {
        if (this.form.role) {
          return this.valuablesData
            .filter((x) => x.map == this.form.map)
            .filter((x) => x.role == this.form.role);
        } else {
          return this.valuablesData.filter((x) => x.map == this.form.map);
        }
      } else {
        return this.valuablesData;
      }
    },
  },
  methods: {
    select(filter) {
      this.form = filter;
    },
  },
};
</script>
<style lang="scss" scoped></style>
