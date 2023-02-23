<template>
  <div>
    <div>
      父组件:
      <el-input v-model="text" class="w200" placeholder="按钮文字"></el-input>
    </div>
    <div class="flex-row flex-center">
      孙组件：<Son class="mgt10" :text="text" @btn="btn" />
    </div>
  </div>
</template>

<script>
import Son from './Components/Son';
import debounce from 'lodash/debounce'; // 防抖处理
export default {
  name: 'Tele',
  components: {
    Son,
  },
  watch: {
    text: {
      handler(val) {
        this.msg(val);
      },
    },
  },
  data() {
    return {
      text: '测试',
    };
  },
  methods: {
    btn() {
      this.$message.success('父组件触发了按钮！');
    },
    msg: debounce(function (val) {
      this.$message.info(`父组件向孙组件传递信息【${val}】`);
    }, 500),
  },
};
</script>

<style lang="scss" scoped></style>
