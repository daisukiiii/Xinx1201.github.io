<template>
  <el-form class="flex-row flex-wrap" :inline="true" :model="form">
    <div class="flex-auto" />

    <!-- 用户名 -->
    <el-form-item>
      <el-input
        v-model="form.role"
        clearable
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>

    <!-- 掉落 -->
    <el-form-item>
      <el-select filterable v-model="form.items" placeholder="请选择掉落">
        <el-option
          v-for="item in valuablesData"
          :key="item.name"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import valuablesData from '@/assets/data/valuables.json';

const genNew = () => ({
  role: '', // 用户名
  items: '太一玄晶', // 物品
});

export default {
  data() {
    return {
      valuablesData, // 掉落统计
      form: genNew(),
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
