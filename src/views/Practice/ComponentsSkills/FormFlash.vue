<template>
  <el-form :model="form" ref="form" label-width="50px" class="form">
    <el-form-item label="名称">
      <el-input
        v-model="form.name"
        placeholder="请输入名称"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="form.gender" placeholder="请选择性别" clearable>
        <el-option
          v-for="item in genderOptions"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <!-- 错误提示 -->
    <el-form-item
      label="生日"
      :class="changeColor ? 'is-error is-required' : ''"
    >
      <div class="tip" v-if="changeColor">生日日期不正确</div>
      <el-date-picker
        type="date"
        @focus="cancelTimer"
        v-model="form.birthday"
        placeholder="选择生日"
        clearable
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
const genNew = () => ({
  name: '', // 姓名
  age: '', // 年龄
  birthday: '', // 生日
});
export default {
  name: 'Flash',
  data() {
    return {
      timer: null, // 定时器
      changeColor: false, // 是否红色闪动
      form: genNew(),
      genderOptions: ['男', '女'],
    };
  },
  methods: {
    submit() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.changeColor = !this.changeColor;
      }, 500);
    },
    cancelTimer() {
      this.changeColor = false;
      clearInterval(this.timer);
    },
    reset() {
      this.form = genNew();
      this.cancelTimer();
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  position: relative;

  ::v-deep {
    .el-input__inner,
    .el-date-editor {
      width: 300px;
    }
  }

  .tip {
    position: absolute;
    z-index: 1;
    right: 0px;
    top: -28px;
    color: red;
  }
}
</style>
