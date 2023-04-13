<template>
  <div class="flex-column">
    <div class="infoBox">
      数据源:
      <a :href="href" target="_blank">剑三魔盒</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      href: 'https://www.jx3box.com/app/database/',
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.infoBox {
  border: 1px dashed #ddd;
  padding: 15px;
  margin-bottom: 10px;
  .highlight {
    color: red;
  }
}
</style>
