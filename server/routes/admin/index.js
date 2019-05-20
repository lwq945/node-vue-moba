// admin 的路由配置
module.exports = app => {
  const express = require("express")
  const router = express.Router({
    // 将父级路由和子级路由的参数合并，存在冲突参数，子级优先
    mergeParams: true
  });

  // 通用的CRUD接口：通用性、扩展性

  // 通用接口改造 2、找到对应的model
  // 得到url的:resource，把它转换成单数的类名，例如：categories -> Category
  // 而model都写在这个路径下："../../models/
  // inflection 是一个库，require('inflection').classify() 可以把内容转换成类名

  // const modelName = require("inflection").classify(req.params.resource);
  // const Model = require(`../../models/${modelName}`);

  // 添加
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  // 查找并更新
  router.put("/:id", async (req, res) => {
    // 找到对应id，并更新值
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 查找并删除
  router.delete("/:id", async (req, res) => {
    // 找到对应id，删除
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  // 获取
  router.get("/", async (req, res) => {
    // 找出 Category 集合的所有数据，每次限制 10 条
    // populate('parent') 找出字段 parent 关联的模型对象
    const queryOptions = {}
    if(req.Model.modelName === 'Category') {
        queryOptions.populate = 'parent'
    }
    const data = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(data)
  })

  // 查找
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // 通用接口改造 1、在接口上 '/admin/api/' 加 rest/:resource
  // rest是表明接口是 restful接口类型的前缀,加前缀是为了不影响其他的接口
  // :resource 用来动态匹配前端传过来的路径；例如：接收到 categories，接口就是/admin/api/rest/categories
  app.use("/admin/api/rest/:resource", async (req, res, next) => {
    // 通用接口改造 3、给路由添加中间件（处理函数），放入以下代码,就能找到匹配到的url对应的model
    const modelName = require("inflection").classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)
}
