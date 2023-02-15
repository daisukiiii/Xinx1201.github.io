<template>
  <div>
    <el-button class="flex-row" @click="onClickLoading">Loading</el-button>
    <el-table
      class="table"
      :data="tableData"
      v-loading="loading"
      :element-loading-text="loadingText"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column prop="date" label="日期"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {
      loading: false,
      loadingText: '拼命加载中...',
      timer: undefined,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
        },
      ],
    };
  },
  watch: {},
  mounted() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    onClickLoading() {
      this.loading = !this.loading;
      clearInterval(this.timer);
      if (this.loading) {
        let time = 0;
        this.loadingText = '1...';
        this.timer = setInterval(() => {
          time++;
          console.log('time', time);
          if (time > 5 && time < 10) {
            this.loadingText = '2...';
          } else if (time > 10 && time < 15) {
            this.loadingText = '3...';
          } else if (time > 15 && time < 20) {
            this.loadingText = '4...';
          } else if (time > 20) {
            this.loadingText = '5...';
          }
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  overflow: auto;
}
</style>
