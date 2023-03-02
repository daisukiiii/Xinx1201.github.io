<template>
  <div class="forcast-time">
    <!-- 时间区域 -->
    <div class="container flex-row flex-center">
      <!-- 开始时间 -->
      <div class="startTime">{{ timestamp | dateToString('datetime') }}</div>
      <div class="symbol">+</div>
      <!-- 间隔时间 -->
      <div class="intervalTime">
        <el-input-number
          v-model="form.intervalTime"
          controls-position="right"
          :min="0"
        ></el-input-number>
        分钟
      </div>
      <div class="symbol">=</div>
      <!-- 结束时间 -->
      <div class="endTime" v-if="!form.intervalTime">
        {{ timestamp | dateToString('datetime') }}
      </div>
      <div class="endTime" v-else>
        {{ form.endTime | dateToString('datetime') }}
      </div>
    </div>

    <!-- 删除按钮 -->
    <div class="del">
      <el-button
        @click="onClickDel"
        v-if="multipleSelection && multipleSelection.length"
        >删除</el-button
      >
    </div>
    <!-- 记录时间 -->
    <div class="record">
      <el-button type="primary" @click="onRecordTime">记录时间</el-button>
    </div>
  </div>
</template>

<script>
const genNew = () => ({
  originTime: 0, // 开始时间
  intervalTime: 0, // 间隔时间
  endTime: 0, // 结束时间
});

export default {
  name: 'ForcastTime',
  props: {
    timestamp: {
      type: Number,
      default: () => 0,
    },
    multipleSelection: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    'form.intervalTime': {
      handler(val) {
        // 记录下计算时候的开始时间
        this.form.originTime = this.timestamp;
        let formatTime = val * 60 * 1000;
        this.form.endTime = formatTime + this.timestamp;
      },
    },
  },
  data() {
    return {
      form: genNew(),
    };
  },
  methods: {
    // 记录时间
    onRecordTime() {
      this.$emit('time', this.form);
      this.form = genNew();
    },
    // 删除信息
    onClickDel() {
      this.$emit('multipleDelet');
    },
    // 重置时间
    reset() {
      this.form = genNew();
    },
  },
};
</script>
<style lang="scss" scoped>
.forcast-time {
  height: 100px;
  background-color: #fafafa;
  position: relative;

  .container {
    height: 100%;
    line-height: 100%;

    .symbol {
      font-size: 20px;
      font-weight: bold;
      margin: 0 20px;
    }
  }

  .notify {
    position: absolute;
    left: 0;
    top: 0;
  }

  .del {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .record {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
