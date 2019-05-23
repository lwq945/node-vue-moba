<template>
  <div class="categoryEdit">
    <h1>{{ id ? "编辑":"新建"}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple placeholder="请选择">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name: '',
      },
      categories: []
    };
  },
  created() {
    // id为真时，才获取要编辑的内容
    this.id && this.getEditContent()
    this.getCategories()
  },
  methods: {
    //async await 方式
    // 保存数据
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/articles', this.model)
      }

      this.$router.push("/articles/list")
      this.$message({
        message: "保存成功",
        type: "success"
      })
    },
    // 获取要编辑的内容,显示在输入框中
    async getEditContent() {
      const res = await this.$http.get(`rest/articles/${this.id}`)
      //console.log(res.data)
      this.model = res.data
    },
    // 获取分类数据
    async getCategories() {
      const res = await this.$http.get('rest/categories')
      this.categories = res.data
      //console.log(this.parents)
    }
  },
  components: {
    VueEditor
  }
}
</script>
