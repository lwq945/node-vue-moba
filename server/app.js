// 程序应用入口文件
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

require('./plugins/db.js')(app)
require('./routes/admin/index.js')(app)

app.listen(3000, () => {
    console.log("http://localhost:3000")
})