<template>
  <div id="graph" class="flex-row flex-center"></div>
</template>

<script>
import Plotly from 'plotly.js-dist';
import listData from './list.json';
export default {
  name: 'Violin',
  data() {
    return {
      listData,
    };
  },
  mounted() {
    this.initViolin(this.listData);
  },
  methods: {
    // x轴抽取到对应的间隔范围
    formatXaxis(date) {
      let arr = [];
      date.forEach((x) => {
        // 年 - 月
        let str = x.split('-')[0] + '-' + x.split('-')[1];
        if (!arr.some((x) => x == str)) {
          arr.push(str);
        }
      });
      return arr;
    },

    /*小提琴图插件展示*/
    initViolin(listData) {
      let dataList = Object.keys(listData).map((key) => {
        return {
          // x: key,
          x: key.split('-')[0] + '-' + key.split('-')[1],
          y: listData[key].length,
        };
      });

      // x轴显示的区间范围
      let xTickvals = this.formatXaxis(Object.keys(listData));
      console.log(xTickvals);
      var myPlot = document.getElementById('graph');
      let rows = dataList;
      function unpack(rows, key) {
        return rows.map(function (row) {
          return row[key];
        });
      }
      let data = [
        {
          name: '',
          type: 'violin',
          x: unpack(rows, 'x'),
          y: unpack(rows, 'y'),
          tickformat: '%Y-%MM',
          points: 'all',
          box: {
            visible: false,
          },
          line: {
            color: '#1f77b4',
          },
          hoverinfo: 'y',
          hovertemplate: `数值：%{y}`,
          hoveron: 'points+kde',
          meanline: {
            visible: true,
          },
          side: 'positive', // 小提琴阴影只显示正极
          pointpos: '-0.5', // 气泡图位置
          bandwidth: 10, // 设置小提琴阴影宽度
          marker: {
            size: 12,
            opacity: 0.5,
          },
        },
      ];

      let layout = {
        title: '小提琴图',
        hovermode: 'closest',
        xaxis: {
          // For more time formatting types, see: https://github.com/d3/d3-time-format/blob/master/README.md
          tickformat: '%Y-%m',
          tickvals: xTickvals,
        },
        width: '1500',
        yaxis: {
          zeroline: false,
          title: {
            text: '',
          },
        },
      };

      Plotly.newPlot('graph', data, layout, { showSendToCloud: false });

      myPlot.on('plotly_click', function (data) {
        console.log(data);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
