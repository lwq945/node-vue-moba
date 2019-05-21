<template>
  <div class="categoryEdit">
    <h1>{{ id ? "编辑":"新建"}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级名称">
        <el-select v-model="model.parent" placeholder="请选择">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents: []
    };
  },
  created() {
    // id为真时，才获取要编辑的内容
    this.id && this.getEditContent();
    this.getParents()
  },
  methods: {
    // .then .catch 方式
    // save() {
    //   this.$http.post('categories').then(res => {}).catch(error => {})
    // }

    //async await 方式
    // 保存数据
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post('rest/categories', this.model);
      }

      this.$router.push("/categories/list");
      this.$message({
        message: "保存成功",
        type: "success"
      });
    },
    // 获取要编辑的内容,显示在输入框中
    async getEditContent() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    // 获取父类数据
    async getParents() {
      const res = await this.$http.get('rest/categories')
      this.parents = res.data
      //console.log(this.parents)
    }
  }
}
</script>
