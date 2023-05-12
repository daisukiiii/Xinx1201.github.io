<template>
  <el-table
    border
    height="760"
    style="width: 100%"
    stripe
    :data="visibleData"
    v-load-more.expand="{
      func: loadmore,
      target: '.el-table__body-wrapper',
      delay: 300,
    }"
    :cell-style="{ textAlign: 'center' }"
    :header-cell-style="{ textAlign: 'center' }"
    v-table-move="['fmeaTableRef']"
    :load-more-disabled="disabledLoad"
  >
    <el-table-column
      v-for="item in columns"
      :key="item.label"
      :prop="item.value"
      :label="item.label"
      :width="item.width"
    >
    </el-table-column>
  </el-table>
</template>

<script>
const dataTemplate = new Array(2000).fill({
  date: '2009-01-01',
  name: 'Tom',
  age: '30',
});
const debounce = function (func, delay) {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    timer = null;
    let self = this;
    let args = arguments;
    timer = setTimeout(() => {
      func.apply(self, args);
    }, delay);
  };
};
export default {
  props: {
    tableData: {
      type: Array,
      default: () => dataTemplate,
    },
    columns: {
      type: Array,
      default: () => [
        {
          label: '时间',
          value: 'date',
        },
        {
          label: '名称',
          value: 'name',
        },
        {
          label: '年龄',
          value: 'age',
        },
      ],
    },
  },
  directives: {
    'load-more': {
      bind(el, binding, vnode) {
        const { expand } = binding.modifiers;
        // 使用更丰富的功能，支持父组件的指令作用在指定的子组件上
        if (expand) {
          /**
           * target 目标DOM节点的类名
           * distance 减少触发加载的距离阈值，单位为px
           * func 触发的方法
           * delay 防抖时延，单位为ms
           * load-more-disabled 是否禁用无限加载
           */
          let { target, distance = 0, func, delay = 200 } = binding.value;
          if (typeof target !== 'string') return;
          let targetEl = el.querySelector(target);
          if (!targetEl) {
            console.log('找不到容器');
            return;
          }
          binding.handler = debounce(function () {
            const { scrollTop, scrollHeight, clientHeight } = targetEl;
            let disabled = el.getAttribute('load-more-disabled');
            disabled = vnode[disabled] || disabled;

            if (scrollHeight <= scrollTop + clientHeight + distance) {
              if (disabled) return;
              func && func();
            }
          }, delay);
          targetEl.addEventListener('scroll', binding.handler);
        } else {
          binding.handler = helper.debounce(function () {
            const { scrollTop, scrollHeight, clientHeight } = el;
            if (scrollHeight === scrollTop + clientHeight) {
              binding.value && binding.value();
            }
          }, 200);
          el.addEventListener('scroll', binding.handler);
        }
      },
      unbind(el, binding) {
        let { arg } = binding;
        // 使用更丰富的功能，支持父组件的指令作用在指定的子组件上
        if (arg === 'expand') {
          /**
           * target 目标DOM节点的类名
           * offset 触发加载的距离阈值，单位为px
           * method 触发的方法
           * delay 防抖时延，单位为ms
           */
          const { target } = binding.value;
          if (typeof target !== 'string') return;
          let targetEl = el.querySelector(target);
          targetEl && targetEl.removeEventListener('scroll', binding.handler);
          targetEl = null;
        } else {
          el.removeEventListener('scroll', binding.handler);
          el = null;
        }
      },
    },
  },
  data() {
    return {
      visibleCount: 30,
    };
  },
  created() {},
  computed: {
    disabledLoad() {
      return false;
    },
    visibleData() {
      return this.tableData?.slice(
        0,
        Math.min(this.tableData.length, this.visibleCount)
      );
    },
  },
  methods: {
    loadmore() {
      console.log('滚动到底部了');
      this.visibleCount += 10;
    },
  },
};
</script>
