<template>
  <div>
    <el-button @click="onClickBtn">{{ text }}</el-button>
    <el-button @click="onClickBtn1">子组件</el-button>
  </div>
</template>

<script>
export default {
  name: 'GroundSon',
  props: {
    text: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {};
  },
  methods: {
    onClickBtn() {
      this.$notify({
        title: '孙->父组件',
        message: '孙组件$emit了事件给父组件,并且触发了弹窗！',
        type: 'success',
      });
      this.$emit('btn');
    },
    onClickBtn1() {
      this.$notify({
        title: '孙->子组件',
        message: '孙组件$emit了事件给子组件,并且触发了弹窗！',
        type: 'success',
      });
      this.$emit('btn1');
    },
  },
};
</script>

<style lang="scss" scoped></style>
