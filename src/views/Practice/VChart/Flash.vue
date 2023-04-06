<template>
  <div class="echart">
    <el-button class="btn" @click="onClickBlink"> 闪烁 </el-button>
    <VChart
      autoresize
      style="width: 100%; height: 75vh"
      :option="eChartOptions"
      :loading="loading"
    />
  </div>
</template>

<script>
import VChart from '@/components/echarts/VChart.vue';

const chartSettings = {
  eChartOptions: {
    color: ['#008ED0', '#43FFD6'],
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
    },
    legend: {
      orient: 'horizontal',
      left: 'right',
      top: 'top',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        show: false,
      },
    },
    grid: {
      top: '6%',
      bottom: '10%',
      left: '10%',
      right: '5%',
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: '测试',
        data: [120, 200, 150, 80, 50, 110, 130],
        type: 'bar',
      },
      {
        name: 'test',
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
      },
    ],
  },

  updateOptions(data) {
    this.eChartOptions.series[0].data = data;
    return this.eChartOptions;
  },
};
export default {
  components: {
    VChart,
  },
  data() {
    return {
      highlightText: 'Fri',
      originOptions: null,
      eChartOptions: null,
      timer: undefined,
      loading: false,
    };
  },
  mounted() {
    clearInterval(this.timer);
    this.eChartOptions = chartSettings.eChartOptions;
    // 深拷贝 - 用于闪烁显示
    this.originOptions = JSON.parse(JSON.stringify(this.eChartOptions));
  },
  methods: {
    onClickBlink() {
      clearInterval(this.timer);
      this.loading = true;

      let xIndex = this.eChartOptions.xAxis.data.indexOf(this.highlightText);
      let dataArr = this.originOptions.series.map((x) => x.data[xIndex]);

      this.timer = setInterval(() => {
        this.loading = false;
        this.eChartOptions.series = this.eChartOptions.series.map((x, i) => {
          if (typeof x.data[xIndex] !== 'object') {
            let value = x.data[xIndex];
            x.data[xIndex] = {
              value,
              itemStyle: {
                color: '#a90000',
              },
            };
          } else {
            let value = dataArr[i];
            x.data[xIndex] = value;
          }
          return x;
        });
      }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
.echart {
  position: relative;
  .btn {
    position: absolute;
    right: 10%;
    z-index: 9;
  }
}
</style>
