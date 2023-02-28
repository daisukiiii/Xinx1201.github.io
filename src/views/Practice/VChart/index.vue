<template>
  <div class="echart">
    <el-button class="btn" @click="refresh"> 更新数据 </el-button>
    <VChart
      autoresize
      style="width: 100%; height: 75vh"
      :option="eChartOptions"
      :loading-options="loadingOpt"
      :loading="loading"
    />
  </div>
</template>

<script>
import VChart from '@/components/echarts/VChart.vue';

const yAxis0 = {
  type: 'value',
  name: '次数',
  minInterval: 1,
  axisLabel: {
    formatter: '{value}',
  },
};

const chartSettings = {
  eChartOptions: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: [yAxis0],
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
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
      eChartOptions: null,
      loading: false,
      loadingOpt: {
        text: 'loading',
        color: '#c23531',
        textColor: '#000',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        zlevel: 0,
        // Font size. Available since `v4.8.0`.
        fontSize: 12,
        // Show an animated "spinner" or not. Available since `v4.8.0`.
        showSpinner: true,
        // Radius of the "spinner". Available since `v4.8.0`.
        spinnerRadius: 10,
        // Line width of the "spinner". Available since `v4.8.0`.
        lineWidth: 5,
        // Font thick weight. Available since `v5.0.1`.
        fontWeight: 'normal',
        // Font style. Available since `v5.0.1`.
        fontStyle: 'normal',
        // Font family. Available since `v5.0.1`.
        fontFamily: 'sans-serif',
      },
    };
  },
  mounted() {
    this.eChartOptions = chartSettings.eChartOptions;
  },
  methods: {
    refresh() {
      this.loading = true;
      console.log('更新数据');
      setTimeout(() => {
        this.loading = false;
        this.eChartOptions = chartSettings.updateOptions(this.random(7));
      }, this.randomInt(100, 500));
    },
    random(index) {
      let arr = []; // 随机数字
      for (let i = 0; i < index; i++) {
        arr.push(this.randomInt(100, 500));
      }
      return arr;
    },

    // 随机数
    randomInt(min, max) {
      return Math.round(Math.random() * (max - min) + min);
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
