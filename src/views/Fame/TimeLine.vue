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
        <div
          :style="dayjs().minute() >= `${stage.time}` ? 'color:#0bbd87' : ''"
        >
          <copyable :value="stage.name" />
          <div class="mgt10">{{ dayjs().hour() + ':' + stage.time }}</div>
        </div>
      </el-timeline-item>
    </el-timeline>
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
  data() {
    return {
      dayjs,
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.el-card {
  height: 100%;

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
}
</style>
