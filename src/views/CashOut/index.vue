<template>
  <div class="flex-column flex-ai-stretch">
    <Operation
      @getServerGold="getServerGold"
      @add="add"
      ref="operation"
      class="flex-none"
    />
    <DataTable
      :serverGold="serverGold"
      :tableData="tableData"
      class="flex-auto"
    />
  </div>
</template>

<script>
import Operation from './Operation';
import DataTable from './DataTable';
import debounce from 'lodash/debounce';

export default {
  components: {
    Operation,
    DataTable,
  },
  data() {
    return {
      serverGold: 0, // 服务器金价

      tableData: [],
    };
  },
  mounted() {
    this.add();
  },
  methods: {
    // 防抖处理的用户金价
    getServerGold: debounce(function (val) {
      if (val == '') {
        this.serverGold = 0;
      } else {
        this.serverGold = val;
      }
    }, 500),

    add() {
      this.tableData.push({
        id: new Date().getTime(),
        goods: '',
        number: 0,
        price: 0,
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
