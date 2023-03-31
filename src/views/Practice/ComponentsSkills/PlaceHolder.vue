<template>
  <div>
    <div class="mgb20">展示占位符打字 循环效果</div>
    <div class="mgb20">
      <el-button @click="onClickStart">开始定时器</el-button>
      <el-button @click="onClickDestroy">摧毁定时器</el-button>
    </div>
    <el-input v-model="text" :placeholder="placeholder"></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null, // 定时器
      text: '', // 输入的文字
      placeholder: '请输入文字', //展现的文字
      placeholderArr: ['996.ICU', 'Baidu.com', '请输入你想输入的文字(⊙o⊙)…'],
    };
  },
  methods: {
    onClickStart() {
      this.clearTimer();
      this.typewriter();
      // let count = 0;
      // this.timer = setInterval(() => {
      //   console.log(count % this.placeholderArr.length);
      //   count += 1;
      // }, 1000);
    },
    onClickDestroy() {
      this.clearTimer();
    },

    // 打字机模式
    typewriter() {
      // let str = '请输入你想输入的文字(⊙o⊙)…';
      // let strArr = str.split('');
      // console.log(strArr);

      // setTimeout(() => {}, 900);
      for (let i = 0; i < this.placeholderArr.length; i++) {
        this.add(this.placeholderArr[i]);
      }
    },

    add(arr, time = 1000) {
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
      if (this.timer) {
        clearInterval(this.timer);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
