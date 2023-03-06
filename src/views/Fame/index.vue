<template>
  <div class="flex-row fame">
    <div class="timeline">
      <TimeLine :time="currentTime" :stage="currentStage" />
    </div>
    <div class="map">
      <Map :time="currentTime" :stage="currentStage" />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import Map from './Map.vue';
import TimeLine from './TimeLine.vue';
import fameData from '@/assets/data/fame.json';
export default {
  components: {
    Map,
    TimeLine,
  },
  data() {
    return {
      fameData, // 声望数据源
      timer: null, // 定时器

      currentStage: {}, // 当前阶段
      currentTime: undefined, // 当前时间
    };
  },
  created() {
    // Fixed 初始化页面没有数据
    this.getCurrentStage();
    this.currentTime = dayjs().valueOf();
  },
  mounted() {
    // 获取当前时间点的声望任务
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.getCurrentStage();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    getCurrentStage() {
      let hourType = dayjs().hour() % 2 ? 'odd' : 'even';
      let minType = dayjs().minute() < 30 ? 'zero' : 'half';
      // 根据当前(时、分)获取当前名望阶段
      this.currentTime = dayjs().valueOf();
      this.currentStage = this.fameData[`${hourType}`][`${minType}`];
    },
  },
};
</script>
<style lang="scss" scoped>
.fame {
  height: calc(100vh - 125px);
  min-height: 800px;
  min-width: 1600px;

  .timeline {
    width: 30%;
    height: 100%;
    margin: 0 5%;
  }
  .map {
    width: 970px;
    height: 785px;
  }
}
</style>
