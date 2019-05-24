<template>
  <div class="heroEdit">
    <h1>{{ id ? "编辑":"新建"}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="skills">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate v-model="model.scores.difficult" :max="10" show-score style="margin-top:12px"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate v-model="model.scores.skills" :max="10" show-score style="margin-top:12px"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate v-model="model.scores.attack" :max="10" show-score style="margin-top:12px"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate v-model="model.scores.survive" :max="10" show-score style="margin-top:12px;"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" placeholder="请输入内容" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" placeholder="请输入内容" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团队思路">
            <el-input type="textarea" placeholder="请输入内容" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})">
            <i class="el-icon-plus"></i> 添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" placeholder="请输入内容" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" placeholder="请输入内容" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" round @click="model.skills.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem;">
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
      model: {
        name: '',
        avatar: '',
        title: '',
        skills: [],
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        }
      },
      categories: [],
      items: []
    }
  },
  created() {
    // id为真时，才获取要编辑的内容
    this.id && this.getEditContent()
    this.getCategories()
    this.getItems()
  },
  methods: {
    //async await 方式
    // 保存数据
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model)
      } else {
        res = await this.$http.post("rest/heroes", this.model)
      }

      this.$router.push("/heroes/list")
      this.$message({
        message: "保存成功",
        type: "success"
      })
    },
    // 获取要编辑的内容,显示在输入框中
    async getEditContent() {
      const res = await this.$http.get(`rest/heroes/${this.id}`)
      console.log(res.data)
      this.model = Object.assign({}, this.model, res.data)
    },
    async getCategories() {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
    // 获取物品
    async getItems() {
      const res = await this.$http.get(`rest/items`)
      this.items = res.data
    },
    afterUpload(res) {
      //console.log(res)
      this.model.avatar = res.url
    }
  }
}
</script>
