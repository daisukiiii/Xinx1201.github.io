<template>
  <div>
    <el-table :data="tableData" style="width: 100%" height="80vh">
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column label="物品" align="center">
        <template slot-scope="scope">
          <el-cascader
            v-model="scope.row.goods"
            clearable
            :options="goods"
            :show-all-levels="false"
          ></el-cascader>
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.number"
            controls-position="right"
            :min="0"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="预估单价(金/个)" align="center">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.price"
            controls-position="right"
            :min="0"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="总金价" align="center">
        <template slot-scope="scope">
          {{ (scope.row.number * scope.row.price) | gameGoldTransform }}
        </template>
      </el-table-column>
      <el-table-column label="￥可提现" align="center">
        <template slot-scope="scope">
          {{
            serverGold != ''
              ? ((scope.row.number * scope.row.price) / serverGold).toFixed(2) +
                '元'
              : '-'
          }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="onClickDel(scope.row.id)">
            删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import goods from '@/assets/data/goods.json';

export default {
  name: 'CashOutDataTable',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    serverGold: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      goods,
    };
  },
  computed: {},
  methods: {
    // 删除该条数据
    onClickDel(id) {
      let index = this.tableData.findIndex((x) => x.id == id);
      this.tableData.splice(index, 1);
    },

    getSummaries({ columns, data }) {
      console.log(columns);
      console.log(data);
      // return sums;
    },
  },
};
</script>
<style lang="scss"></style>
