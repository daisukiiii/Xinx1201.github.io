<template>
  <div>
    <Lock class="lock" @login="login" v-show="!isLogin" />
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      type="border-card"
      class="tabs-container"
    >
      <el-tab-pane v-for="item in tabs" :name="item.name" :key="item.key">
        <span slot="label"><i :class="item.icon"></i> {{ item.name }}</span>
        <Drag v-if="item.key == 'Drag'" />
        <Echarts v-if="item.key == 'Echarts'" />
        <PlotlyJs v-if="item.key == 'PlotlyJs'" />
        <TodoList v-if="item.key == 'TodoList'" />
        <Websocket v-if="item.key == 'Websocket'" />
        <TableTree v-if="item.key == 'TableTree'" />
        <DebounceThrottle v-if="item.key == 'DebounceThrottle'" />
        <ComponentsSkills v-if="item.key == 'ComponentsSkills'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Lock from './Lock.vue';
import Drag from './Drag';
import Echarts from './Echarts';
import PlotlyJs from './PlotlyJs';
import TodoList from './TodoList';
import Websocket from './Websocket';
import TableTree from './TableTree';
import DebounceThrottle from './DebounceThrottle';
import ComponentsSkills from './ComponentsSkills';
export default {
  name: 'Practice',
  components: {
    Lock,
    Drag,
    Echarts,
    PlotlyJs,
    TodoList,
    Websocket,
    TableTree,
    DebounceThrottle,
    ComponentsSkills,
  },
  data() {
    return {
      activeName: '代办列表',
      isLogin: false,
      tabs: [
        {
          icon: 'el-icon-notebook-2',
          name: '代办列表',
          key: 'TodoList',
        },
        {
          icon: 'el-icon-rank',
          name: '拖拽组件',
          key: 'Drag',
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
        {
          icon: 'el-icon-eleme',
          name: '表格树形结构',
          key: 'TableTree',
        },
      ],
    };
  },

  mounted() {
    // 恢复点击项
    let check = window.localStorage.getItem('practiceCheck');
    if (check) {
      this.activeName = JSON.parse(check);
    }
    this.isLogin = JSON.parse(window.localStorage.getItem('login'));
  },
  methods: {
    login() {
      this.isLogin = true;
    },
    // 保存当前点击项
    handleClick(tab) {
      window.localStorage.setItem('practiceCheck', JSON.stringify(tab.name));
    },
  },
};
</script>

<style lang="scss" scoped>
.lock {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: transparent;
  backdrop-filter: blur(15px); //毛玻璃属性
}
.tabs-container {
  height: calc(100vh - 110px);

  ::v-deep .el-tabs__content {
    height: calc(100vh - 180px);
    overflow: auto;
  }
}
</style>
