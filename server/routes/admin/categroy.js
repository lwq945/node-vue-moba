// admin 的路由配置
module.exports = app => {
    const express = require('express')
    const router = express.Router()

    const Category = require("../../models/Category")
    
    // 添加分类：获取前端的内容保存到数据库
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)   //model.create() 将一个或多个文档保存到数据库的快捷方式。返回的是promise对象
        res.send(model)
    })
    // 更新分类
    router.put('/categories/:id', async (req, res) => {
        // 找到对应id，并更新值
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)   
        res.send(model)
    })

    // 删除分类
    router.delete('/categories/:id', async (req, res) => {
        // 找到对应id，删除
        await Category.findByIdAndDelete(req.params.id, req.body)   
        res.send({
            success: true
        })
    })
    
    // 获取所有分类数据，发送到前端
    router.get('/categories', async (req, res) => {
        // 找出 Category 集合的所有数据，每次限制 10 条
        // populate('parent') 找出字段 parent 关联的模型对象
        const data = await Category.find().populate('parent').limit(10)
        res.send(data)
    })

     // 根据 id 查找数据，发送到前端
     router.get('/categories/:id', async (req, res) => {
        const model = await Category.findById(req.params.id)
        res.send(model)
    })
    
    app.use('/admin/api', router)
}