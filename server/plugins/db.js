module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
        useNewUrlParser: true,
        useFindAndModify: false
    })

    // require-all: 这个库可以把 (__dirname + '/../models') 路径定义的所有模型都引用一遍，防止关联模型未使用时报错
    require('require-all')(__dirname + '/../models')
}