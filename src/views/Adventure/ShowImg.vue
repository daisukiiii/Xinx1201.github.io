<template>
  <el-image
    :src="url"
    ref="preview"
    :preview-src-list="[url]"
    style="width: 300px; height: 150px"
  >
  </el-image>
</template>

<script>
export default {
  name: 'AdventureImg',
  props: {
    url: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {};
  },
  methods: {
    show() {
      this.$refs.preview.showViewer = true;
    },
  },
};
</script>
<style lang="scss" scoped></style>
