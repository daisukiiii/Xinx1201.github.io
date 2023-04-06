<template>
  <div class="echart">
    <!-- 闪烁 -->
    <Flash />
    <!-- 虚实结合的折线 -->
    <CustomLine />
  </div>
</template>

<script>
import Flash from './Flash.vue';
import CustomLine from './CustomLine.vue';
export default {
  components: {
    Flash,
    CustomLine,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped></style>
