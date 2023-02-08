<template>
  <div class="flex-column flex-center">
    <i class="el-icon-lock icon"></i>
    <el-form :model="form" @submit.native.prevent>
      <el-form-item :class="error ? 'is-error' : ''">
        <el-input
          clearable
          class="psw"
          v-model="password"
          @clear="error = false"
          @input="error = false"
          placeholder="请输入密码"
          @keyup.enter="submit"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Lock',
  data() {
    return {
      form: {},
      password: '',
      error: false,
      correct: '1996',
    };
  },
  methods: {
    onChangePsw(val) {
      console.log(val);
    },
    submit() {
      if (this.password == this.correct) {
        this.$emit('login');
        // 记录当前状态
        window.localStorage.setItem('login', true);
      } else {
        this.error = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  font-size: 80px;
  margin-top: -120px;
  margin-bottom: 25px;
}
.psw {
  width: 300px;
}
</style>
