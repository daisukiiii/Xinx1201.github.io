<template>
  <el-table
    v-el-table-infinite-scroll="load"
    :data="data"
    :infinite-scroll-disabled="disabled"
    height="200px"
  >
    <el-table-column type="index" />
    <el-table-column prop="date" label="date" />
    <el-table-column prop="name" label="name" />
    <el-table-column prop="age" label="age" />
  </el-table>
</template>

<script>
const dataTemplate = new Array(10).fill({
  date: '2009-01-01',
  name: 'Tom',
  age: '30',
});

export default {
  data() {
    return {
      data: [],
      page: 0,
      total: 5,
      disabled: false,
    };
  },
  methods: {
    load() {
      console.log(123);
      if (this.disabled) return;
      this.data = this.data.concat(dataTemplate);
    },
  },
};
</script>
