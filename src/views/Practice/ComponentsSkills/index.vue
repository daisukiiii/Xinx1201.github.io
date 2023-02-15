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
    <!-- 组件三、表格树形数据 -->
    <el-card shadow="hover">
      <TableTree class="individual " />
    </el-card>
    <!-- 组件四、Css过渡 -->
    <el-card shadow="hover">
      <Transition class="individual" />
    </el-card>
    <!-- 组件五、Loading -->
    <el-card shadow="hover">
      <Loading class="individual" />
    </el-card>
  </div>
</el-card>
  </div>
</template>
<script>
import Loading from './Loading.vue'
import FormFlash from './FormFlash.vue';
import TableTree from './TableTree.vue';
import Transition from './Transition.vue';
import TableKeyWord from './TableKeyWord.vue';
export default {
  name: 'Components',
  components: {
    Loading,
    FormFlash,
    TableTree,
    Transition,
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
