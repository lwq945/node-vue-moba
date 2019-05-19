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
    
    // 获取数据，发送到前端
    router.get('/categories', async (req, res) => {
        const data = await Category.find().limit(10)
        res.send(data)
    })
    app.use('/admin/api', router)
}