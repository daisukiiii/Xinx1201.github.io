<!-- VChart -->
<script>
import VChart from 'vue-echarts'; // 必须显式指定此路径而不是默认入口，当前项目webpack打包时默认入口不是module而是main，默认会指向全量引入
import theme from '@/assets/style/echarts/macarons.json';
import loading from '@/assets/style/echarts/loading.json';

export default {
  mixins: [VChart],
  props: {
    theme: {
      type: [String, Object],
      default: () => theme,
    },
    loadingOptions:{
      type: [String, Object],
      default: () => loading,
    }
  },
  created() {},
};
</script>
