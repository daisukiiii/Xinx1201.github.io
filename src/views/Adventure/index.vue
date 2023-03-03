<template>
  <div class="adventure flex-column flex-ai-stretch">
    <!-- 筛选框 -->
    <Operation @config="config" @check="check" class="flex-none" />
    <!-- 奇遇展示页 -->
    <Adventure :form="form" class="flex-auto" ref="adventure" />
    <!-- 展示图片 -->
    <ShowImg v-show="false" :url="url" ref="showImg" />
    <!-- 导出图片 -->
    <div class="export">
      <el-button type="primary" @click="onClickExport">导出图片</el-button>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';
import ShowImg from './ShowImg.vue';
import Operation from './Operation.vue';
import Adventure from './Adventure.vue';
export default {
  name: 'AdventureIndex',
  components: {
    ShowImg,
    Operation,
    Adventure,
  },
  data() {
    return {
      form: {}, // 筛选项配置信息
      url: '', // 图片地址
    };
  },
  methods: {
    // 筛选项配置信息
    config(val) {
      this.form = val;
    },

    // 点击选择按钮
    check(val) {
      this.$refs.adventure.check(val);
    },

    // 导出图片
    onClickExport() {
      html2canvas(document.querySelector('.containers'), {
        useCORS: true,
        backgroundColor: '#FFF',
      }).then((canvas) => {
        const link = document.createElement('a'); // 创建一个超链接对象实例
        const event = new MouseEvent('click'); // 创建一个鼠标事件的实例
        link.download = `${this.name}奇遇.png`; // 设置要下载的图片的名称
        link.href = canvas.toDataURL(); // 将图片的URL设置到超链接的href中
        // html2canvas与el-image配合使用
        this.url = link.href;
        setTimeout(() => {
          this.$refs.showImg.show();
        }, 100);
        link.dispatchEvent(event); // 触发超链接的点击事件
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.adventure {
  position: relative;
  .export {
    position: absolute;
    right: 3%;
    bottom: 0;
  }
}
</style>
