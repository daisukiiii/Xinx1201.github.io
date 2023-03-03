<template>
  <el-form class="flex-row flex-wrap" :inline="true" :model="form">
    <div class="flex-auto" />

    <!-- 大区 -->
    <el-form-item>
      <el-select
        filterable
        v-model="form.zone"
        @change="onChangeZone"
        placeholder="请选择大区"
      >
        <el-option
          v-for="item in zoneList"
          :key="item.zone"
          :label="item.zone"
          :value="item.zone"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <!-- 服务器 -->
    <el-form-item>
      <el-select filterable v-model="form.server" placeholder="请选择服务器">
        <el-option
          v-for="item in serverList"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <!-- 地图 -->
    <el-form-item>
      <el-select
        filterable
        v-model="form.map"
        @change="onChangeMap"
        placeholder="请选择地图"
      >
        <el-option-group
          v-for="group in horseMapData"
          :key="group.type"
          :label="group.type"
        >
          <el-option
            v-for="item in group.positions"
            :key="item.map"
            :label="item.map"
            :value="item.map"
          >
          </el-option>
        </el-option-group>
      </el-select>
    </el-form-item>

    <!-- 马驹类型 -->
    <el-form-item>
      <el-select filterable v-model="form.type" placeholder="请选择马驹类型">
        <el-option
          v-for="item in horseTypeList"
          :key="item"
          :label="item"
          :value="item"
        >
          <span v-html="$options.filters.filterKeyWord(item)"></span>
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import serverData from '@/assets/data/server.json';
import horseMapData from '@/assets/data/horseMap.json';
import horseTypeData from '@/assets/data/horseType.json';

const genNew = () => ({
  zone: '双线一区', // 区服
  server: '破阵子', // 服务器
  map: '', // 地图
  type: '', // 马的类型
});

export default {
  data() {
    return {
      serverData, // 服务器/大区列表
      horseMapData, // 马驹地图数据
      horseTypeData, // 马驹类型数据
      form: genNew(),
    };
  },
  computed: {
    // 大区列表
    zoneList() {
      return serverData;
    },
    // 服务器列表
    serverList() {
      if (this.form.zone) {
        return serverData.find((x) => x.zone == this.form.zone).servers;
      } else {
        return serverData.map((x) => x.servers).flat();
      }
    },
    // 马驹类型数据
    horseTypeList() {
      if (this.form.map) {
        return horseTypeData[this.form.map];
      } else {
        return new Set(Object.values(horseTypeData).flat());
      }
    },
  },
  watch: {
    form: {
      handler(val) {
        this.$emit('select', val);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 大区修改
    onChangeZone() {
      // 大区修改后，默认选择该大区下的第一个服务器
      this.form.server = this.serverList[0];
    },
    // 马驹地图选择
    onChangeMap() {
      // 马驹地图修改后，默认选择该地图刷新的第一种类的马驹
      this.form.type = this.horseTypeList[0];
    },
    // 重置筛选项
    reset() {
      this.form = genNew();
    },
  },
};
</script>
<style lang="scss" scoped></style>
