<template>
  <el-card shadow="hover">
    <div slot="header">
      <span>{{ stage.title }}</span>
      <span class="mgl10">{{ time | dateToString('time') }}</span>
    </div>

    <el-timeline>
      <el-timeline-item
        v-for="(stage, index) in stage.stages"
        :key="index"
        :color="dayjs().minute() >= stage.time ? '#0bbd87' : ''"
      >
        <div :style="dayjs().minute() >= stage.time ? 'color:#0bbd87' : ''">
          <copyable :value="stage.name" />
          <div class="mgt10">{{ dayjs().hour() }}:{{ stage.time }}</div>
        </div>
      </el-timeline-item>
    </el-timeline>

    <!-- 阶段统计 -->
    <div class="statistic">
      <span class="already">{{ alreadyDone.length }}</span>
      <span> / </span>
      <span>{{ stage.stages.length }}</span>
    </div>
  </el-card>
</template>

<script>
import dayjs from 'dayjs';
export default {
  name: 'FameTimeLine',
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
  watch: {
    time: {
      handler(val) {
        let minuteArr = this.stage.stages.map((x) => Number(x.time));
        this.alreadyDone = minuteArr.filter((x) => x <= dayjs(val).minute());
      },
      immediate: true,
    },
  },
  data() {
    return {
      dayjs,
      alreadyDone: [], // 已完成事件
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.el-card {
  height: 100%;
  position: relative;

  .el-timeline {
    width: 130px;
    margin: auto;

    .el-timeline-item {
      height: 60px;

      &:first-child {
        margin-top: 20px;
      }
    }
  }

  // 阶段统计
  .statistic {
    width: 50px;
    height: 30px;
    line-height: 30px;
    border: 1px dashed #eee;
    position: absolute;
    bottom: 0;
    right: 0;

    .already {
      color: #0bbd87;
    }
  }
}
</style>
