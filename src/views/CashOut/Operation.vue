<template>
  <el-form class="flex-row flex-wrap" :inline="true" :model="form">
    <el-form-item label="服务器金价">
      <el-input-number
        size="mini"
        v-model="serverGold"
        controls-position="right"
        :min="0"
      ></el-input-number>
    </el-form-item>
    <div class="flex-auto" />
    <el-form-item>
      <el-button type="primary" icon="el-icon-plus" @click="onClickAdd"
        >新增</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      serverGold: 780, // 服务器金价
    };
  },
  computed: {},
  watch: {
    serverGold: {
      handler(val) {
        this.$emit('getServerGold', val);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    onClickAdd() {
      this.$emit('add');
    },
  },
};
</script>
<style lang="scss" scoped></style>
