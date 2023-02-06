<template>
  <div>
    <el-tabs type="border-card" class="tabs-container">
      <el-tab-pane v-for="item in tabs" :key="item.key">
        <span slot="label"><i :class="item.icon"></i> {{ item.name }}</span>
        <Echarts v-if="item.key == 'Echarts'" />
        <PlotlyJs v-if="item.key == 'PlotlyJs'" />
        <TodoList v-if="item.key == 'TodoList'" />
        <Websocket v-if="item.key == 'Websocket'" />
        <DebounceThrottle v-if="item.key == 'DebounceThrottle'" />
        <ComponentsSkills v-if="item.key == 'ComponentsSkills'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Echarts from './Echarts';
import PlotlyJs from './PlotlyJs';
import TodoList from './TodoList';
import Websocket from './Websocket';
import DebounceThrottle from './DebounceThrottle';
import ComponentsSkills from './ComponentsSkills';
export default {
  name: 'Practice',
  components: {
    Echarts,
    PlotlyJs,
    TodoList,
    Websocket,
    DebounceThrottle,
    ComponentsSkills,
  },
  data() {
    return {
      tabs: [
        {
          icon: 'el-icon-notebook-2',
          name: '代办列表',
          key: 'TodoList',
        },
        {
          name: '防抖节流',
          key: 'DebounceThrottle',
        },
        {
          icon: 'el-icon-s-data',
          name: 'Echarts图表',
          key: 'Echarts',
        },
        {
          icon: 'el-icon-data-analysis',
          name: 'plotly.js',
          key: 'PlotlyJs',
        },
        {
          name: 'Websocket',
          key: 'Websocket',
        },
        {
          icon: 'el-icon-eleme',
          name: 'ElementUI相关',
          key: 'ComponentsSkills',
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.tabs-container {
  height: calc(100vh - 110px);
}
</style>
