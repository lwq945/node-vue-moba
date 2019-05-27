// admin 的路由配置
module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    // 将父级路由和子级路由的参数合并，存在冲突参数，子级优先
    mergeParams: true
  })
  
  

  // 通用的CRUD接口：通用性、扩展性

  // 通用接口改造 2、找到对应的model
  // 得到url的:resource，把它转换成单数的类名，例如：categories -> Category
  // 而model都写在这个路径下："../../models/
  // inflection 是一个库，require('inflection').classify() 可以把内容转换成类名

  // const modelName = require("inflection").classify(req.params.resource);
  // const Model = require(`../../models/${modelName}`);

  // 插入数据
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  // 更新
  router.put('/:id', async (req, res) => {
    // 找到对应id，并更新值
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 删除
  router.delete('/:id', async (req, res) => {
    // 找到对应id，删除
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  // 获取列表数据
  router.get('/', async (req, res, next) => {
    // 获取token
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先登录')
    // 验证 token 
    const { id } = jwt.verify(token, app.get('secret'))
    assert(id, 401, '请先登录')
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录')
    await next()

  },async (req, res) => {
    // 找出 Category 集合的所有数据，每次限制 10 条
    // populate('parent') 找出字段 parent 关联的模型对象
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const data = await req.Model.find()
      .setOptions(queryOptions)
      .limit(10)
    res.send(data)
  })

  // 获取详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // 通用接口改造 1、在接口上 '/admin/api/' 加 rest/:resource
  // rest是表明接口是 restful接口类型的前缀,加前缀是为了不影响其他的接口
  // :resource 用来动态匹配前端传过来的路径；例如：接收到 categories，接口就是/admin/api/rest/categories
  app.use('/admin/api/rest/:resource',async (req, res, next) => {
    // 通用接口改造 3、给路由添加中间件（处理函数），放入以下代码,就能找到匹配到的url对应的model
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  // 上传图片的路由
  // 使用中间件 multer 来处理上传的文件
  const multer = require('multer')
  // dest属性是：存储文件的路径,这里要使用绝对路径，'/../../upload'是当前文件相对于uploads文件夹的
  // upload.single('file') 是上传单个文件，'file' 是上传图片自己生成的字段名
  // 具体在浏览器查看请求头的 Form data的数据 file: (binary)
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post(
    '/admin/api/upload',
    upload.single('file'),
    async (req, res, next) => {
      const file = req.file
      file.url = `http://localhost:3000/uploads/${file.filename}`
      res.send(file)
    }
  )

  // 登录
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1. 根据用户名查找用户
    // select('+password') 表示查的时候把密码(定义模型时设置了select：false)也查出来
    const user = await AdminUser.findOne({username}).select('+password')
    assert(user, 422, '用户不存在')

    // 2. 校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')

    // 3. 返回token  
    const token = jwt.sign({id: user._id}, app.get('secret'))
    res.send({ token })
  })


  // 错误处理函数，捕获 http-assert 抛出的异常
  app.use(async (err, req, res, next) => {
    //console.log(err)
    res.status(err.status).send({
      message: err.message
    })
  })
}
