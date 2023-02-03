<template>
  <div>
    <el-tabs type="border-card" class="tabs-container">
      <el-tab-pane v-for="item in tabs" :label="item.name" :key="item.key">
        <Echarts v-if="item.key == 'Echarts'" />
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
import TodoList from './TodoList';
import Websocket from './Websocket';
import DebounceThrottle from './DebounceThrottle';
import ComponentsSkills from './ComponentsSkills';
export default {
  name: 'Practice',
  components: {
    Echarts,
    TodoList,
    Websocket,
    DebounceThrottle,
    ComponentsSkills,
  },
  data() {
    return {
      tabs: [
        {
          name: '代办列表',
          key: 'TodoList',
        },
        {
          name: '防抖节流',
          key: 'DebounceThrottle',
        },
        {
          name: 'Echarts图表',
          key: 'Echarts',
        },
        {
          name: 'Websocket',
          key: 'Websocket',
        },
        {
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
