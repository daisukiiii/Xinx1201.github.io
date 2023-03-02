<template>
  <div class="map-container">
    <!-- 顶部展示栏 -->
    <div class="toolbox flex-row flex-between">
      <!-- 当前阶段 -->
      <div class="currentTitle">
        当前阶段:<span class="currentName">{{ currentStageTitle }}</span>
      </div>
      <!-- 地图名称 -->
      <div class="mapName">
        {{ stage.title }}
      </div>
      <!-- 下一阶段 -->
      <div class="nextTitle">
        下一阶段:<span class="nextName">{{ nextStageTitle }}</span>
      </div>
    </div>

    <!-- 地图信息 -->
    <div
      class="map"
      :style="{
        background: 'url(' + stage.url + ') no-repeat',
        backgroundPositionX: 'center',
      }"
    />

    <!-- 当前阶段Dot -->
    <span :id="currentStageTitle" style="position: absolute" class="dot"></span>
    <!-- 下一阶段Dot -->
    <span
      :id="nextStageTitle"
      v-if="nextStageTitle.split('/').length != 2"
      style="position: absolute"
      class="nextDot"
    ></span>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import fameData from '@/assets/data/fame.json';
export default {
  props: {
    stage: {
      type: Object,
      default: () => {},
    },
    time: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      fameData,

      currentStageTitle: '', // 当前位置
      nextStageTitle: '', // 下一个位置
    };
  },

  watch: {
    time: {
      handler() {
        this.getTitle();
      },
      immediate: true,
    },
  },
  methods: {
    getTitle() {
      let hourType = dayjs().hour() % 2 ? 'odd' : 'even';
      let minType = dayjs().minute() < 30 ? 'zero' : 'half';
      // 获取到所有完成阶段的列表
      let filterFinishStageArr = this.stage.stages.filter((x) => {
        if (dayjs().minute() >= x.time) {
          return x;
        }
      });
      //  当前阶段名称
      this.currentStageTitle =
        filterFinishStageArr[filterFinishStageArr.length - 1].name;

      // 下一个阶段名称
      if (this.stage.stages.length > filterFinishStageArr.length) {
        // 本地图内 则显示下一个地点位置
        this.nextStageTitle =
          this.stage.stages[filterFinishStageArr.length].name;
      } else {
        // 如果跨地图的话 显示【地图/位置】
        if (minType == 'zero') {
          this.nextStageTitle =
            this.fameData[`${hourType}`].half.title +
            '/' +
            this.fameData[`${hourType}`].half.stages[0].position;
        } else {
          if (hourType == 'odd') {
            this.nextStageTitle =
              this.fameData.even.zero.title +
              '/' +
              this.fameData.even.zero.stages[0].position;
          } else {
            this.nextStageTitle =
              this.fameData.odd.zero.title +
              '/' +
              this.fameData.odd.zero.stages[0].position;
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/style/FameMap.scss';
</style>
