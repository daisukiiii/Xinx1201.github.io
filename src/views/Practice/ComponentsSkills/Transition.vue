<template>
  <div class="container">
    {{ show ? '显示' : '隐藏' }}侧边栏
    <!-- 整个框 -->
    <div :class="show ? 'aside left' : 'aside right'">
      <!-- 侧边按钮 -->
      <div class="asideBtn" @click="show = !show">
        <i
          :class="show ? 'icon el-icon-arrow-right' : 'icon el-icon-arrow-left'"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Transition',
  data() {
    return {
      show: false, // 是否展开
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #eee;
  position: relative;
  overflow: hidden;

  // 侧边栏
  .aside {
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 99%;
    background-color: #efc;
    border: 1px solid #ccc;
    // 整体过渡效果
    transition: all 0.4s ease;
  }
  .left {
    right: 0px;
  }
  .right {
    right: -22px;
  }

  .icon {
    z-index: 1;
  }

  // 侧边栏展开/关闭按钮
  .asideBtn {
    position: absolute;
    right: 20px;
    height: 100%;
    line-height: 100%;
    // icon居中
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:before {
      content: '';
      position: absolute;
      right: 0px;
      top: calc(50% - 50px / 2);
      width: 20px;
      height: 50px;
      background-color: #ddd;
    }
  }
}
</style>
