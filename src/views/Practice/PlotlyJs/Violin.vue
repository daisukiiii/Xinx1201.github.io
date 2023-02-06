<template>
  <div id="graph" class="flex-row flex-center"></div>
</template>

<script>
import Plotly from 'plotly.js-dist';
export default {
  name: 'Violin',
  data() {
    return {
      listData: [
        {
          x: '2022-01-01',
          y: 7.5161,
        },
        {
          x: '2022-01-01',
          y: 8.5161,
        },
        {
          x: '2022-01-01',
          y: 2.5161,
        },
        {
          x: '2022-01-01',
          y: 1.5161,
        },
        {
          x: '2022-01-01',
          y: 9.5161,
        },
        {
          x: '2022-01-01',
          y: 12.5161,
        },
        {
          x: '2022-01-01',
          y: 12.1,
        },
        {
          x: '2022-01-01',
          y: 7.51,
        },
        {
          x: '2022-01-01',
          y: 29,
        },
        {
          x: '2022-01-01',
          y: 17.2,
        },
        {
          x: '2022-01-01',
          y: 17.56,
        },

        {
          x: '2022-01-02',
          y: 7.5161,
        },
        {
          x: '2022-01-02',
          y: 8.5161,
        },
        {
          x: '2022-01-02',
          y: 2.5161,
        },
        {
          x: '2022-01-02',
          y: 1.5161,
        },
        {
          x: '2022-01-02',
          y: 9.5161,
        },
        {
          x: '2022-01-02',
          y: 12.5161,
        },
        {
          x: '2022-01-02',
          y: 12.1,
        },
        {
          x: '2022-01-02',
          y: 7.51,
        },
        {
          x: '2022-01-02',
          y: 37.5,
        },
        {
          x: '2022-01-02',
          y: 17.2,
        },
        {
          x: '2022-01-02',
          y: 17.56,
        },
      ],
    };
  },
  mounted() {
    this.initViolin(this.listData);
  },
  methods: {
    /*小提琴图插件展示*/
    initViolin(dataList) {
      let rows = dataList;
      function unpack(rows, key) {
        return rows.map(function(row) {
          return row[key];
        });
      }
      let data = [
        {
          name: '测试',
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
          hovertemplate: '%{y}日: %{y}',
          hoveron: 'points+kde',
          meanline: {
            visible: true,
          },
          side: 'positive',
          pointpos: '-0.5',
          marker: {
            size: 10,
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
          tickvals: ['2022-01', '2022-02', '2022-03', '2022-04', '2022-05'],
        },
        width:'1500',
        yaxis: {
          zeroline: false,
          title: {
            text: '',
          },
        },
      };

      Plotly.newPlot('graph', data, layout, { showSendToCloud: false });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
