<template>
  <div>
    <el-button @click="onClickDialog"> 打开 Dialog</el-button>
    <Detail ref="detail" />
  </div>
</template>

<script>
import Detail from './Detail.vue'
export default {
  data() {
    return {};
  },
  components:{
    Detail,
  },
  methods: {
    onClickDialog(){
      this.$refs.detail.open()
    }
  },
}
</script>
<style lang='scss' scoped></style>