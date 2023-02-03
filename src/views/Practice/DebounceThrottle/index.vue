<template>
  <div class="flex-row flex-center">
    <el-form ref="form" class="form" :model="form" label-width="190px">
      <el-form-item label="未进行防抖处理的input:">
        <el-input
          v-model="form.unDebounce"
          @input="unDebounceInput"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="防抖处理的input:">
        <el-input
          v-model="form.debounce"
          @input="debounceInput"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="节流处理的input:">
        <el-input
          v-model="form.throttle"
          @input="throttleInput"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import dayjs from 'dayjs';
export default {
  name: 'DebounceThrottle',
  data() {
    return {
      form: {
        unDebounce: '', // 未进行防抖处理的input
        debounce: '', // 防抖处理的input
        throttle: '', // 节流处理的input
      },
    };
  },
  watch: {
    'form.unDebounce': {
      handler(val) {
        // console.log(val);
      },
    },
  },
  methods: {
    // 未进行防抖处理的input
    unDebounceInput(val) {
      console.log(dayjs().format('HH:mm:ss'), val);
    },
    // 防抖处理的input
    debounceInput: debounce(function (val) {
      console.log(dayjs().format('HH:mm:ss'), val);
    }, 1000),
    // 节流处理的input
    throttleInput: throttle(function (val) {
      console.log(dayjs().format('HH:mm:ss'), val);
    }, 1000),
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 450px;
}
</style>
