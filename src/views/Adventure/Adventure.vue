<template>
  <div class="adventure flex-row flex-center">
    <div class="containers flex-row flex-wrap" shadow="hover">
      <template v-for="(item, index) in adventure">
        <el-card
          :key="index"
          class="box"
          shadow="hover"
          @click.native="onClickIsFinish(item)"
        >
          <template v-if="item.type != 99">
            <!-- 背景 -->
            <img :src="item.bg" class="bg" />
            <!-- 中间 -->
            <img :src="item.img" class="cover" />
            <!-- 文字 -->
            <img :src="item.text" class="text" />

            <!-- 右上角上角已完成tag -->
            <div
              v-if="item.isFinish && form.type"
              :style="{
                backgroundColor: form?.school?.school
                  ? schools.find((x) => x.school == form?.school?.school).color
                  : '#8D90D8',
              }"
              class="finish"
            >
              已完成
            </div>

            <!-- 勾选√选中状态 -->
            <div v-if="item.isFinish && !form.type" class="check">√</div>
          </template>

          <!-- 首项 -->
          <template v-else-if="item.name == 'first'">
            <div class="first">
              <div class="logo mgt10">
                <img
                  :src="
                    schools.find((x) => x.school == form?.school?.school)?.icon
                  "
                  alt=""
                />
              </div>
              <div class="name">{{ form.id }}</div>
              <div class="server">{{ form.server }}</div>
            </div>
          </template>

          <!-- 尾项 -->
          <template v-else-if="item.name == 'end'">
            <div class="container">
              <div class="normal flex-row flex-center">
                <span class="adventure">普通奇遇</span>
                <div>
                  {{
                    adventure.filter((x) => x.type == 1 && x.isFinish == true)
                      .length
                  }}/{{ adventure.filter((x) => x.type == 1).length }}
                </div>
              </div>
              <div class="perfect flex-row flex-center">
                <span class="adventure">绝世奇遇</span>
                <div>
                  {{
                    adventure.filter((x) => x.type == 0 && x.isFinish == true)
                      .length
                  }}/{{ adventure.filter((x) => x.type == 0).length }}
                </div>
              </div>
              <div class="time">
                {{ new Date().toLocaleDateString() }}
              </div>
            </div>
          </template>
        </el-card>
      </template>
    </div>
  </div>
</template>

<script>
import schools from '@/assets/data/school.json';
import adventure from '@/assets/data/adventure.json';
export default {
  name: 'Adventure',
  props: {
    form: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      schools,
      adventure,
    };
  },
  computed: {
    adventureList() {
      return this.adventure.filter((x) => x.type !== 99);
    },
  },
  mounted() {
    // 为每个奇遇添加是否完成的标记
    this.adventure = this.adventure.map((item) => {
      return {
        ...item,
        isFinish: false,
      };
    });
  },
  watch: {
    form: {
      handler(val) {
        if (val) {
          // 更换对应门派&阵营的图片
          this.changePic(val);
        }
      },
      deep: true,
    },
  },
  methods: {
    onClickIsFinish(item) {
      this.adventureList.find((x) => x.name == item.name).isFinish =
        !item.isFinish;
    },

    check(type) {
      switch (type) {
        case 'all':
          // 勾选全部
          if (this.adventureList.every((x) => x.isFinish == true)) {
            this.adventure
              .filter((x) => x.type !== 99)
              .forEach((x) => {
                x.isFinish = false;
              });
          } else {
            this.adventureList.forEach((x) => {
              x.isFinish = true;
            });
          }
          break;
        case 'normal':
          // 如果全部选中 置为未选中状态
          if (this.adventureList.every((x) => x.isFinish == true)) {
            this.adventureList.forEach((x) => {
              x.isFinish = false;
            });
          }
          // 勾选普通奇遇
          this.adventureList.forEach((x) => {
            if (x.type == 1) {
              x.isFinish = !x.isFinish;
            } else {
              x.isFinish = false;
            }
          });
          break;
        case 'perfect':
          // 如果全部选中 置为未选中状态
          if (this.adventureList.every((x) => x.isFinish == true)) {
            this.adventureList.forEach((x) => {
              x.isFinish = false;
            });
          }
          // 勾选绝世奇遇
          this.adventureList.forEach((x) => {
            if (x.type == 0) {
              x.isFinish = !x.isFinish;
            } else {
              x.isFinish = false;
            }
          });
          break;
        default:
          break;
      }
    },

    changePic(val) {
      this.adventure.forEach((x) => {
        if (x.cw) {
          // 橙武奇遇替换掉对应的图片
          x.img = x.img.replace(
            x.img.match(/school_(\S*)_open/)[0],
            `school_${val.school.id}_open`
          );
        }
        if (x.camp) {
          // 黑白路替换掉对应的图片
          x.img = x.img.replace(
            x.img.match(/camp_(\S*)_open/)[0],
            `camp_${val.camp.id}_open`
          );
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
// 去除card自带的padding
::v-deep {
  .el-card__body,
  .el-main {
    padding: 0px;
  }
}
@import '@/assets/style/Adventure.scss';
</style>
