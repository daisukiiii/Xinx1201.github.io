import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: "张三",
    age: 18,
    gender: "male",
    // school:''
  },
  getters: {
    // 默认第一个参数为state
    getName: (state) => {
      return state.name ? '李四' : '王五'
    },
    // 也可以传入第二个参数 getters
    getNameType: (state, getters) => {
      return typeof getters.getName
    },
    // 传入用户需要传入的参数 让其本身返回另一个函数
    getNameDefault (state) {
      return function (name) {
        return state.name ? name : 'xxx'
      }
    },
  },
  mutations: {
    // 默认第一个参数为state 第二个为payload(载荷)
    changeName (state, name) {
      state.name = name
    },
    changeAge (state, age) {
      state.age = age
    },
    changeUserInfo (state, info) {
      this.commit('changeName', info.name)
      this.commit('changeAge', info.age)
    }
  },
  actions: {
  },
  modules: {
  }
})
