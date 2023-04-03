<template>
  <div v-visibility-change="change">
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
  computed: {
    placeholderMaxLength() {
      return this.placeholderArr
        .map((x) => x.split(''))
        .sort((a, b) => b.length - a.length)[0].length;
    },
    placeholderArrLength() {
      return this.placeholderArr.map((x) => x.split('')).flat(Infinity).length;
    },
  },
  data() {
    return {
      timer: null, // 定时器
      timerStart: null,
      text: '', // 输入的文字
      placeholder: '请输入文字', //展现的文字
      placeholderArr: ['996.ICU', 'Baidu.com', 'xin-code.com', 'Xinx1201.com'],
    };
  },
  async mounted() {
    this.start();
  },
  methods: {
    change(evt, hidden) {
      if (hidden) {
        // 未在本页面
        this.clearTimer();
      } else {
        this.start();
      }
    },

    start() {
      console.log(
        `等待${
          (this.placeholderArr.length * 1000 +
            this.placeholderMaxLength * 100) /
          1000
        } 秒`
      );

      clearInterval(this.timerStart);
      this.timerStart = setInterval(async () => {
        console.log(this.placeholderMaxLength);
        for (let i = 0; i < this.placeholderArr.length; i++) {
          console.log(`等待了${(this.placeholderMaxLength * 100) / 1000}s`);
          await sleep(this.placeholderMaxLength * 100);
          this.showText(this.placeholderArr[i], 50);
        }
      }, this.placeholderArr.length * 1000 + this.placeholderMaxLength * 100);
    },
    clearTimer() {
      clearInterval(this.timer);
      this.timer = null;
      clearInterval(this.timerStart);
      this.timerStart = null;
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
  },
};
</script>
<style lang="scss" scoped></style>
