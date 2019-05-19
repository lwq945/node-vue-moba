<template>
    <div class="categoryList">
        <h1>分类列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width="230">
            </el-table-column>
            <el-table-column prop="name" label="分类名称">
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
      this.getCategoryLists()
  },
  methods: {
    //async await 方式
    async getCategoryLists() {
        const res = await this.$http.get('categories')
        this.items = res.data 
    }
  }
}
</script>
