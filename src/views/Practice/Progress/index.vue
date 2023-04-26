<template>
  <div class="container">
    <el-button @click="startTimer">开始定时器</el-button>
    <div class="box" :style="{ '--width': `${width}px` }">测试</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null, // 定时器
      width: 0,
    };
  },
  mounted() {},
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    startTimer() {
      clearInterval(this.timer);

      this.width = 0;
      this.timer = setInterval(() => {
        if(this.width == 100){
          clearInterval(this.timer);
        }else{
          this.width += 1;
        }
      }, 100);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .box {
    width: 100px;
    height: 100px;
    background-color: #ccc;
    position: absolute;
    top: 50px;
    // left: 0;
    &:before {
      content: '';
      width: var(--width);
      height: 2px;
      position: absolute;
      bottom: 0px;
      left: 0px;
      background-color: #000;
    }
  }
}
</style>
