<template>
  <div class="itemList">
    <h1>物品列表</h1>
    <el-table stripe :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height: 3rem">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <!--  scope.row 是指当前项（操作）的内容对象 {_id: xxx,name: xxxx} -->
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/items/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="primary" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  created() {
    this.getItemLists();
  },
  methods: {
    // 获取物品列表数据
    async getItemLists() {
      const res = await this.$http.get('rest/items')
      this.items = res.data
    },
    // 删除物品列表选中的数据
    remove(row) {
      this.$confirm(`是否确定要删除物品 "${row.name}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`rest/items/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // 删除后，重新获取物品列表数据
        this.getItemLists()
      })
    }
  }
}
</script>
