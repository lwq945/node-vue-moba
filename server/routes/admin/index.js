// admin 的路由配置
module.exports = app => {
    const express = require('express')
    const router = express.Router()

    const Category = require("../../models/Category")

    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)   //model.create() 将一个或多个文档保存到数据库的快捷方式。返回的是promise对象
        res.send(model)
    })
    
    app.use('/admin/api', router)
}