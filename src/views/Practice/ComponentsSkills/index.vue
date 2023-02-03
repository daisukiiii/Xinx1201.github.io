<template>
  <!-- ElementUI-组件相关使用技巧 -->
  <div class="all flex-row flex-wrap">
    <!-- 组件一、表单闪烁 -->
    <el-card shadow="hover">
      <FormFlash class="individual" />
    </el-card>
    <!-- 组件二、表格筛选 -->
    <el-card shadow="hover">
      <TableKeyWord class="individual" />
    </el-card>
  </div>
</el-card>
  </div>
</template>
<script>
import FormFlash from './FormFlash.vue';
import TableKeyWord from './TableKeyWord.vue';
export default {
  name: 'Components',
  components: {
    FormFlash,
    TableKeyWord,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.all {
  width: 100%;
  
  .el-card{
    margin: 10px;

    .individual {
      width: 350px;
      height: 260px;
    }
  }
}
</style>
