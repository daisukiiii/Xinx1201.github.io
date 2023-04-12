<template>
  <el-form class="flex-row flex-wrap" :inline="true" :model="form">
    <div class="flex-auto" />
    <el-form-item>
      <el-input
        clearable
        v-model="form.keyWord"
        placeholder="请输入关键字"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        keyWord: '',
      },
    };
  },
  computed: {},
  watch: {
    form: {
      handler(val) {
        this.$emit('select', val);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped></style>
