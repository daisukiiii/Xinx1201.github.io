<template>
  <div>
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
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        data: [150, 230, 224, 218, 222],
        type: 'line',
      },
      {
        data: [null, null, null, null, 222, 150, 230],
        type: 'line',
        lineStyle: {
          color: '#5470C6',
          width: 4,
          type: 'dashed',
        },
      },
      {
        // name: '平行于y轴的趋势线',
        type: 'line',
        markLine: {
          symbol: 'none', // 去掉警戒线最后面的箭头
          label: {
            // position: 'middle',
            position: 'end', // 将警示值放在哪个位置，三个值“start”,'middle','end'  开始  中点 结束
            formatter: '预测线',
            color: '#000',
          },
          data: [
            {
              silent: true, // 鼠标悬停事件  true没有，false有
              lineStyle: {
                // 警戒线的样式  ，虚实  颜色
                // type: 'dash',
                type: 'solid',
                color: '#ccc',
                width: 1,
              },
              // 警戒线的标注值，可以有多个yAxis,多条警示线 或者采用 {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
              xAxis: 'Fri',
            },
          ],
        },
      },
    ],
  },

  updateOptions() {
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
    };
  },
  mounted() {
    this.eChartOptions = chartSettings.eChartOptions;
  },
  methods: {},
};
</script>
<style lang="scss" scoped></style>
