<template>
  <div class="echart">
    <VChart
      autoresize
      style="width: 100%; height: 75vh"
      :option="eChartOptions"
    />
  </div>
</template>

<script>
import { registerMap } from 'echarts/core';
import jiangsuJson from './江苏省.json';
import VChart from '@/components/echarts/VChart.vue';

// 注册地图
registerMap('jiangsu', jiangsuJson);
const chartSettings = {
  eChartOptions: {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'horizontal',
      left: 'right',
      top: 'top',
    },
    geo: {
      map: 'jiangsu',
      emphasis: {
        label: {
          show: true,
          formatter: function (params) {
            return params.name;
          },
          textStyle: {
            color: '#ffd700',
          },
        },
        itemStyle: {
          areaColor: '#2adbc4',
          borderColor: '#FFF',
        },
      },
      label: {
        show: true,
        textStyle: {
          color: '#FFF',
        },
      },
      itemStyle: {
        areaColor: '#1f9094',
        borderColor: '#FFF',
      },
    },
    series: [],
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
    };
  },
  mounted() {
    this.eChartOptions = chartSettings.eChartOptions;
  },
  methods: {},
};
</script>
<style lang="scss" scoped></style>
