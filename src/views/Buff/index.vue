<template>
  <div class="flex-column flex-ai-stretch">
    <!-- 顶部筛选框 -->
    <div class="flex-row flex-between">
      <Info />
      <Operation @select="select" ref="operation" />
    </div>
    <!-- 底部Table -->
    <DataTable :tableData="tableData" class="flex-auto" />
  </div>
</template>

<script>
import Info from './Info';
import Operation from './Operation';
import DataTable from './DataTable';
import buffData from '@/assets/data/buff.json';

export default {
  components: {
    Info,
    Operation,
    DataTable,
  },
  data() {
    return {
      form: {}, // 筛选项
      buffData,

      tableData: [],
    };
  },
  mounted() {
    this.tableData = this.buffData;
  },
  methods: {
    select(filter) {
      this.form = filter;
      let keyWord = filter.keyWord;
      if (keyWord != '') {
        let flatData = this.buffData.map((x) => x.children).flat(Infinity);
        let tableData = flatData.filter(
          (x) =>
            x.id.toString()?.includes(keyWord) ||
            x.name?.includes(keyWord) ||
            x.nickName?.includes(keyWord)
        );

        this.tableData = tableData;
      } else {
        this.tableData = this.buffData;
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
