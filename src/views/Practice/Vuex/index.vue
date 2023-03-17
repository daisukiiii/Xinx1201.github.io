<template>
  <div>
    <div>----------</div>
    <div>state</div>
    <div>----------</div>
    <div>姓名：{{ $store.state.name }}</div>
    <div>姓名：{{ showName }}</div>
    <div>年龄：{{ age }}</div>
    <div>性别：{{ gender }}</div>

    <div>----------</div>
    <div>getters</div>
    <div>----------</div>
    <div>getName：{{ getName }}</div>
    <div>getNameType：{{ getNameType }}</div>
    <div>getNameDefault：{{ getNameDefault('高启强') }}</div>

    <div>----------</div>
    <div>Mutations</div>
    <div>----------</div>
    <el-button @click="onClickChangeName">改变state中的name名称</el-button>
    <el-button @click="onClickChangeUserInfo">改变state中的用户信息</el-button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  data() {
    return {
      msg: '123',
    };
  },
  computed: {
    ...mapState({
      showName: (state) => state.name,
      age: 'age',
    }),
    ...mapState(['gender']),
    ...mapGetters(['getName', 'getNameType', 'getNameDefault']),
  },
  methods: {
    onClickChangeName() {
      this.$store.commit('changeName', '安欣');
    },
    onClickChangeUserInfo() {
      this.$store.commit('changeUserInfo', {
        name: '杨建',
        age: 34,
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
