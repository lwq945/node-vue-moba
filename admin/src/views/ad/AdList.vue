<template>
  <div class="adList">
    <h1>广告位列表</h1>
    <el-table stripe :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="广告位名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <!--  scope.row 是指当前项（操作）的内容对象 {_id: xxx,name: xxxx} -->
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/ads/edit/${scope.row._id}`)"
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
    }
  },
  created() {
    this.getAdLists()
  },
  methods: {
    async getAdLists() {
      const res = await this.$http.get('rest/ads')
      this.items = res.data
    },
    remove(row) {
      this.$confirm(`是否确定要删除广告位 "${row.name}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`rest/ads/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getAdLists()
      })
    }
  }
}
</script>
