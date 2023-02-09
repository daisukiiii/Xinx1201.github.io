<template>
  <div class="flex-column flex-center">
    <draggable
      v-model="myArray"
      group="people"
      @start="drag = true"
      @end="drag = false"
    >
      <div v-for="element in myArray" class="name" :key="element.id">
        {{ element.name }}
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
export default {
  name: 'Drag',
  components: {
    draggable,
  },
  data() {
    return {
      myArray: [
        {
          name: '张三',
          id: 0,
        },
        {
          name: '李四',
          id: 1,
        },
        {
          name: '王五',
          id: 2,
        },
      ],
    };
    methods: {
    }
  },
};
</script>

<style lang="scss" scoped>
.name {
  width: 100px;
  height: 100px;
  line-height: 100px;
  background-color: #eee;

  &.name {
    margin-top: 10px;
  }
}
</style>
