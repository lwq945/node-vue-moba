<template>
  <div class="articleList">
    <h1>文章列表</h1>

    <el-table :data="filterItems" height=500 style="width: 100%" stripe>
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/articles/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="primary" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paginations.currentPage"
        :page-sizes="paginations.page_sizes"
        :page-size="paginations.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginations.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      filterItems: [],
      paginations: {
        currentPage: 1,  // 当前页
        page_size: 5,    // 一页显示的条数
        page_sizes: [5, 10, 15, 20],  // 每页显示条数的选项
        total: 0  // 总条数
      }
    }
  },
  created() {
    this.getArticleLists()
  },
  methods: {
    async getArticleLists() {
      const res = await this.$http.get('rest/articles')
      this.items = res.data
      this.setPagination()
    },
    remove(row) {
      this.$confirm(`是否确定要删除文章 "${row.title}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`rest/articles/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getArticleLists()
      })
    },
    // 初始化分页属性
    setPagination() {
      this.paginations.currentPage = 1
      this.paginations.page_size = 5
      this.paginations.total = this.items.length

      this.filterItems = this.items.filter((item, index) => {
        return index < this.paginations.page_size
      })
    },
    handleSizeChange(page_size) {
      this.paginations.currentPage = 1
      this.paginations.page_size = page_size

      this.filterItems = this.items.filter((item, index) => {
        return index < page_size
      })
    },
    handleCurrentChange(page) {
      // 当前页的起始下标位置
      const currentPage_index = (page - 1) * this.paginations.page_size
      const num = page * this.paginations.page_size
      const tempArr = []

      for (let i = currentPage_index; i < num; i++) {
        if (this.items[i]) {
          tempArr.push(this.items[i])
        }
        this.filterItems = tempArr
      }
    }
  }
}
</script>

<style>
.pagination-wrapper {
  margin-top: 5px;
  text-align: right;
}
</style>
