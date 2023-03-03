<template>
  <el-form
    class="flex-row flex-wrap flex-between adventure"
    :inline="true"
    :model="form"
  >
    <div>
      <!-- 门派 -->
      <el-form-item>
        <el-select
          filterable
          v-model="form.school"
          placeholder="请选择门派"
          value-key="school"
          ref="school"
        >
          <el-option
            v-for="item in schools"
            :key="item.id"
            :label="item.school"
            :value="item"
          >
            <span :style="{ color: item.color }">{{ item.school }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 阵营 -->
      <el-form-item>
        <el-select
          filterable
          v-model="form.camp"
          placeholder="请选择阵营"
          value-key="camp"
          ref="camp"
        >
          <el-option
            v-for="item in pvps"
            :key="item.id"
            :label="item.camp"
            :value="item"
          >
            <span :style="{ color: item.color }">{{ item.camp }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 游戏id -->
      <el-form-item>
        <el-input v-model="form.id" placeholder="请输入游戏ID"></el-input>
      </el-form-item>
      <!-- 服务器 -->
      <el-form-item>
        <el-select filterable v-model="form.server" placeholder="请选择">
          <el-option-group
            v-for="group in servers"
            :key="group.zone"
            :label="group.zone"
          >
            <el-option
              v-for="item in group.servers"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
    </div>

    <!-- 转换样式按钮 -->
    <div class="mgb15">
      <el-switch
        v-model="form.type"
        :active-color="form.school.color"
        inactive-color="rgba(165,11,11,0.8)"
        active-text="角标"
        inactive-text="对勾"
      >
      </el-switch>
    </div>

    <!-- 按钮部分 -->
    <div class="mgb15">
      <el-button @click="onClickCheck('all')">一键完成</el-button>
      <el-button @click="onClickCheck('normal')">一键勾选普通奇遇</el-button>
      <el-button @click="onClickCheck('perfect')">一键勾选绝世奇遇</el-button>
    </div>
  </el-form>
</template>

<script>
import schools from '@/assets/data/school.json';
import servers from '@/assets/data/server.json';
import pvps from '@/assets/data/pvp.json';

const genNew = () => ({
  school: {
    id: '23',
    school: '霸刀',
    color: '#8D90D8',
    icon: 'https://img.jx3box.com/image/school/20.png',
  },
  camp: {
    id: '2',
    camp: '恶人谷',
    color: '#A01E1E',
  },
  id: '', // 游戏id
  server: '破阵子', //服务器
  type: true, // 是否为角标
});

export default {
  name: 'AdventureOperation',
  data() {
    return {
      schools,
      servers,
      pvps,

      form: genNew(),
    };
  },
  computed: {},
  watch: {
    'form.school': {
      handler(val) {
        if (val) {
          // 改变选中后的颜色
          this.$refs.school.$el.children[0].children[0].style.color = val.color;
        }
      },
      deep: true,
    },
    'form.camp': {
      handler(val) {
        if (val) {
          // 改变选中后的颜色
          this.$refs.camp.$el.children[0].children[0].style.color = val.color;
        }
      },
      deep: true,
    },
    form: {
      handler(val) {
        this.$emit('config', val);
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    // 默认霸刀的颜色
    this.$refs.school.$el.children[0].children[0].style.color = '#8D90D8';
    // 默认恶人谷颜色
    this.$refs.camp.$el.children[0].children[0].style.color = '#A01E1E';
  },
  methods: {
    onClickCheck(val) {
      this.$emit('check', val);
    },
  },
};
</script>
<style lang="scss" scoped></style>
