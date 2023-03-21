<template>
  <div class="flex-column flex-ai-stretch">
    <!-- 顶部筛选框 -->
    <Operation @select="select" ref="operation" class="flex-none" />
    <!-- 底部Table -->
    <DataTable
      @selection="selection"
      :tableData="
        form.role
          ? tableData.filter((x) => x.role == this.form.role)
          : tableData
      "
      class="flex-auto"
    />
  </div>
</template>

<script>
import Operation from './Operation.vue';
import DataTable from './DataTable.vue';
import tableData from '@/assets/data/太一玄晶.json';

export default {
  components: {
    Operation,
    DataTable,
  },
  data() {
    return {
      form: {}, // 筛选项
      tableData,

      multipleSelection: [], // 多选数据
    };
  },
  watch: {},

  mounted() {},
  beforeDestroy() {},
  methods: {
    select(filter) {
      this.form = filter;
    },
  },
};
</script>
<style lang="scss" scoped></style>
