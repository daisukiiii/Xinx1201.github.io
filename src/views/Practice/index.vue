<template>
  <div>
    <el-tabs type="border-card" class="tabs-container">
      <el-tab-pane v-for="item in tabs" :label="item" :key="item">
        <Echarts v-if="item == 'Echarts'" />
        <TodoList v-if="item == 'TodoList'" />
        <Websocket v-if="item == 'Websocket'" />
        <ComponentsSkills v-if="item == 'ElementUI相关'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Echarts from './Echarts';
import TodoList from './TodoList';
import Websocket from './Websocket';
import ComponentsSkills from './ComponentsSkills';
export default {
  name: 'Practice',
  components: {
    Echarts,
    TodoList,
    Websocket,
    ComponentsSkills,
  },
  data() {
    return {
      tabs: ['Echarts', 'TodoList', 'Websocket', 'ElementUI相关'],
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
