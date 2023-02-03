<template>
  <div class="flex-column flex-center">
    {{ startTime }} - {{ endTime }}
    <div id="DEMO" ref="demo"></div>

    <el-button @click="search">搜索</el-button>
  </div>
</template>

<script>
export default {
  name: 'Echarts',
  data() {
    return {
      startTime: '2022-01-02',
      endTime: '2022-01-04',
    };
  },
  methods: {
    search() {
      alert(`开始时间:${this.startTime}\n结束时间:${this.endTime}`);
    },
    initEcharts() {
      let myChart = this.$echarts.init(document.getElementById('DEMO'));
      myChart.clear();
      myChart.off('click'); //防止点击重复触发
      var option = {
        xAxis: {
          show: false,
          data: [
            '2023-01-01',
            '2023-01-02',
            '2023-01-03',
            '2023-01-04',
            '2023-01-05',
            '2023-01-06',
            '2023-01-07',
            '2023-01-08',
            '2023-01-09',
            '2023-01-10',
          ],
        },
        yAxis: {
          show: false,
        },

        dataZoom: [
          {
            type: 'inside',
            startValue: '2023-01-02',
            endValue: '2023-01-05',
          },
          {
            startValue: '2023-01-02',
            endValue: '2023-01-05',
          },
        ],
        series: [
          {
            type: 'line',
            data: [0, 2, 10, 0, 20, 0, 0, 5, 3, 7],
            symbolSize: 0, // symbol的大小设置为0让线的小圆点不显示
            showSymbol: false, // 不显示symbol不显示
            lineStyle: {
              width: 0, // 线宽是0不显示线
              color: 'rgba(0, 0, 0, 0)', // 线的颜色是透明的
            },
          },
        ],
      };
      myChart.on('datazoom', (params) => {
        var startValue =
          myChart.getModel().option.xAxis[0].data[
            myChart.getModel().option.dataZoom[0].startValue
          ];
        var endValue =
          myChart.getModel().option.xAxis[0].data[
            myChart.getModel().option.dataZoom[0].endValue
          ];
        this.startTime = startValue;
        this.endTime = endValue;
      });
      myChart.setOption(option);
      this.$nextTick(() => {
        myChart.resize();
      });
      window.addEventListener('resize', function () {
        myChart.resize();
      });
    },
  },

  mounted() {
    this.initEcharts();
  },
};
</script>

<style lang="scss" scoped>
#DEMO {
  width: 900px;
  height: 600px;
}
</style>
