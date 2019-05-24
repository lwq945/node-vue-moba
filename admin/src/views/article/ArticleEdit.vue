<template>
  <div class="articleEdit">
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
        <vue-editor v-model="model.body" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
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
        title: '',
        body: ''
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
    },
    // 处理图片上传后路径不是默认以base64格式的形式，base64格式的路径太长，图片多了，会使页面体积变的很大
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // formData 发送表单数据，'file'字段是上传图片请求时，浏览器请求头生成的Form Data ： file:(binary)
      const formData = new FormData()
      formData.append('file', file)

      const res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, 'image', res.data.url)
      resetUploader()
    }
  },
  components: {
    VueEditor
  }
}
</script>
