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
        <VChart v-if="item.key == 'VChart'" />
        <Echarts v-if="item.key == 'Echarts'" />
        <PlotlyJs v-if="item.key == 'PlotlyJs'" />
        <Progress v-if="item.key == 'Progress'" />
        <TodoList v-if="item.key == 'TodoList'" />
        <Websocket v-if="item.key == 'Websocket'" />
        <TableTree v-if="item.key == 'TableTree'" />
        <DebounceThrottle v-if="item.key == 'DebounceThrottle'" />
        <ComponentsSkills v-if="item.key == 'ComponentsSkills'" />
        <Communication v-if="item.key == 'Communication'" />
        <Vuex v-if="item.key == 'Vuex'" />
        <GeoMap v-if="item.key == 'GeoMap'" />
        <Dialog v-if="item.key == 'Dialog'" />
        <InfiniteTable v-if="item.key == 'InfiniteTable'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Vuex from './Vuex';
import Lock from './Lock.vue';
import VChart from './VChart';
import GeoMap from './GeoMap';
import Echarts from './Echarts';
import Dialog from './Dialog';
import Progress from './Progress';
import PlotlyJs from './PlotlyJs';
import TodoList from './TodoList';
import Websocket from './Websocket';
import TableTree from './TableTree';
import Communication from './Communication';
import DebounceThrottle from './DebounceThrottle';
import ComponentsSkills from './ComponentsSkills';
import InfiniteTable from './InfiniteTable';
export default {
  name: 'Practice',
  components: {
    Vuex,
    Lock,
    VChart,
    GeoMap,
    Dialog,
    Echarts,
    PlotlyJs,
    Progress,
    TodoList,
    Websocket,
    TableTree,
    Communication,
    DebounceThrottle,
    ComponentsSkills,
    InfiniteTable,
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
          name: '防抖节流',
          key: 'DebounceThrottle',
        },
        {
          icon: 'el-icon-s-data',
          name: 'VChart图表',
          key: 'VChart',
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
        {
          icon: 'el-icon-phone-outline',
          name: '组件通讯',
          key: 'Communication',
        },
        {
          icon: 'el-icon-takeaway-box',
          name: 'Vuex',
          key: 'Vuex',
        },
        {
          icon: 'el-icon-s-unfold',
          name: 'Progress',
          key: 'Progress',
        },
        {
          icon: 'el-icon-map-location',
          name: 'GeoMap',
          key: 'GeoMap',
        },
        {
          icon: 'el-icon-info',
          name: 'Dialog',
          key: 'Dialog',
        },
        {
          icon: 'el-icon-tickets',
          name: '表格无限滚动',
          key: 'InfiniteTable',
        },
      ],
    };
  },

  mounted() {
    // 恢复点击项
    let check = window.localStorage.getItem('practiceCheck');
    if (check) {
      this.activeName = JSON.parse(check);
    } else {
      this.activeName = '代办列表';
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
}
</style>
