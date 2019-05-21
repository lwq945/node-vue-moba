// 程序应用入口文件
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

// 把上传文件夹变成静态文件托管
// uploads 文件夹里的文件，可以通过路由 '/uploads' 来访问
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db.js')(app)
require('./routes/admin/index.js')(app)

app.listen(3000, () => {
    console.log("http://localhost:3000")
})