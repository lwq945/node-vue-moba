<template>
  <div class="categoryList">
    <h1>分类列表</h1>
    <el-table stripe :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <!--  scope.row 是指当前项（操作）的内容对象 {_id: xxx,name: xxxx} -->
          <el-button type="primary" size="small" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
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
    this.getCategoryLists();
  },
  methods: {
    //async await 方式
    async getCategoryLists() {
      const res = await this.$http.get("categories");
      this.items = res.data;
    }
  }
};
</script>
