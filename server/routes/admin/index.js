// admin 的路由配置
module.exports = app => {
    const express = require('express')
    const router = express.Router()

    const Category = require("../../models/Category")
    
    // 获取前端的内容保存到数据库
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)   //model.create() 将一个或多个文档保存到数据库的快捷方式。返回的是promise对象
        res.send(model)
    })

    router.put('/categories/:id', async (req, res) => {
        // 找到对应id，并更新值
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)   
        res.send(model)
    })
    
    // 获取数据，发送到前端
    router.get('/categories', async (req, res) => {
        // 找出 Category 集合的所有数据，每次限制 10 条
        const data = await Category.find().limit(10)
        res.send(data)
    })

     // 根据 id 查找数据，发送到前端
     router.get('/categories/:id', async (req, res) => {
        const model = await Category.findById(req.params.id)
        res.send(model)
    })
    
    app.use('/admin/api', router)
}