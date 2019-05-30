// admin 的路由配置
module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const multer = require('multer')
  const bcrypt = require('bcrypt')
  const AdminUser = require('../../models/AdminUser')
  
  const router = express.Router({
    mergeParams: true
  })
  
  
  // 创建数据并插入到数据库
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  // 更新
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 删除
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  // 获取列表数据
  router.get('/', async (req, res) => {
    // populate('parent') 找出字段 parent 关联的模型对象
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const data = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(data)
  })

  // 获取详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  //  获取路径对应的model
  const resourceMiddleware = require('../../middleware/getModel')
  
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  // 上传图片的路由
  // 使用中间件 multer 来处理上传的文件
  // dest属性是：存储文件的路径,这里要使用绝对路径，'/../../upload'是当前文件相对于uploads文件夹的
  // upload.single('file') 是上传单个文件，'file' 是上传图片自己生成的字段名
  // 具体在浏览器查看请求头的 Form data的数据 file: (binary)
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res, next) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  // 登录
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1. 根据用户名查找用户
    // select('+password') 表示查的时候把密码(定义模型时设置了select：false)也查出来
    const user = await AdminUser.findOne({username}).select('+password')
    assert(user, 422, '用户不存在')

    // 2. 校验密码
    const isValid = bcrypt.compareSync(password, user.password)
    assert(isValid, 422, '密码错误')

    // 3. 返回token  
    const token = jwt.sign({id: user._id}, app.get('secret'))
    res.send({ username: user.username, token })
  })


  // 错误处理函数，捕获 http-assert 抛出的异常
  app.use(async (err, req, res, next) => {
    // console.log(err.statusCode)
    // console.log(err.status)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}
