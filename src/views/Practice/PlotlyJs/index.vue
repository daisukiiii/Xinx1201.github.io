<template>
  <div class="Plotly">
    <Violin />
  </div>
</template>

<script>
import Violin from './Violin.vue';
export default {
  name: 'PlotlyJs',
  components: {
    Violin,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.Plotly {
  width: 100%;
}
</style>
