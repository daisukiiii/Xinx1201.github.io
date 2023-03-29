<template>
  <div class="flex-column flex-ai-stretch">
    <!-- 顶部筛选框 -->
    <Operation @select="select" ref="operation" class="flex-none" />
    <!-- 中间加减时间 -->
    <Time
      @time="recordTime"
      :timestamp="timestamp"
      :multipleSelection="multipleSelection"
      @multipleDelet="multipleDelet"
      ref="time"
      class="mgb10"
    />
    <!-- 底部Table -->
    <DataTable
      @selection="selection"
      :tableData="tableData"
      class="flex-auto"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import Time from './Time.vue';
import Operation from './Operation.vue';
import DataTable from './DataTable.vue';
export default {
  components: {
    Time,
    Operation,
    DataTable,
  },
  data() {
    return {
      form: {}, // 筛选项
      tableData: [],
      timer: null, // 定时器
      timestamp: 0, // 时间戳

      multipleSelection: [], // 多选数据
    };
  },
  watch: {
    tableData: {
      handler(val) {
        window.localStorage.setItem('horseData', JSON.stringify(val));
      },
    },

    timestamp: {
      handler(val) {
        let source = JSON.parse(JSON.stringify(this.tableData));
        let fiveMinutes = 300;
        let tenMinutes = 600;
        source.forEach((x) => {
          // 超时的情况下 5分钟添加删除线 10分钟删除该条信息
          let overTime = dayjs(val).diff(x.endTime, 'second');
          if (overTime == fiveMinutes) {
            source.find((item) => item == x).overTime = 5;
            this.tableData = source;
          } else if (overTime > tenMinutes) {
            // 超过10分钟 则删除本条信息
            let index = source.findIndex((item) => item == x);
            source.splice(index, 1);
            this.tableData = source;
          }
        });
      },
    },
  },
  created() {
    this.timestamp = Number(dayjs().valueOf());
  },
  mounted() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.timestamp = Number(dayjs().valueOf());
    }, 1000);

    if (window.localStorage.getItem('horseData')) {
      this.tableData = JSON.parse(window.localStorage.getItem('horseData'));
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    // 顶部筛选项
    select(val) {
      this.form = val;
    },
    // 记录时间
    recordTime(val) {
      this.form = Object.assign(this.form, val);
      this.tableData.push(JSON.parse(JSON.stringify(this.form)));
      // 清空数据
      // 清空筛选项
      this.$refs.operation.reset();
      // 清空时间戳
      this.$refs.time.reset();
    },
    // 选择数据
    selection(val) {
      this.multipleSelection = val;
    },
    // 批量删除数据
    multipleDelet() {
      this.$confirm('此操作将删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.multipleSelection.forEach((item) => {
            let index = this.tableData.findIndex((x) => x == item);
            this.tableData.splice(index, 1);
          });
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped></style>
