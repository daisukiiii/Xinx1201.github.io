<template>
  <div>
    <GroundSon @btn1="btn1" v-on="$listeners" v-bind="$attrs" />
  </div>
</template>

<script>
import GroundSon from './GroundSon.vue';
export default {
  name: 'TeleSon',
  components: {
    GroundSon,
  },
  data() {
    return {};
  },
  methods: {
    btn1() {
      this.$message.warning('子组件触发了按钮！');
    },
  },
};
</script>

<style lang="scss" scoped></style>
