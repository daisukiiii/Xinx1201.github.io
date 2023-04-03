<template>
  <div>
    <div class="mgb20">展示占位符打字 循环效果</div>
    <div class="mgb20">
      <el-button @click="clearTimer">摧毁定时器</el-button>
    </div>
    <el-input v-model="text" :placeholder="placeholder"></el-input>
  </div>
</template>

<script>
import { sleep } from '@/utils';

export default {
  data() {
    return {
      timer: null, // 定时器
      text: '', // 输入的文字
      placeholder: '请输入文字', //展现的文字
      placeholderArr: ['996.ICU', 'Baidu.com', '请输入你想输入的文字(⊙o⊙)…'],
    };
  },
  mounted() {
    this.clearTimer();
    this.timer = setInterval(() => {
      this.typewriter();
    }, 5000);
  },
  methods: {
    // 打字机模式
    async typewriter() {
      for (let i = 0; i < this.placeholderArr.length; i++) {
        await sleep(1000);
        this.showText(
          this.placeholderArr[i],
          this.placeholderArr[i].length * 10
        );
      }
    },

    showText(arr, time = 1000) {
      let num = 0;
      let str = '';
      this.timer = setInterval(() => {
        if (this.timer && num == arr.length) {
          clearInterval(this.timer);
          this.timer = null;
          return;
        }
        str += `${arr[num]}`;

        this.placeholder = str + (num == arr.length - 1 ? '' : '|');
        num++;
      }, time);
    },

    clearTimer() {
      clearInterval(this.timer);
    },
  },
};
</script>
<style lang="scss" scoped></style>
