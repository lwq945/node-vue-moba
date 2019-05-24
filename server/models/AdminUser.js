const mongoose = require('mongoose')
const schema = mongoose.Schema

const AdminUserSchema = new schema({
  username: { type: String },
  password: {
    type: String,
    select: false,
    set(val) {
      return require('bcrypt').hashSync(val, 12)
    }
  }
})

module.exports = mongoose.model('AdminUser', AdminUserSchema)

// password字段
// set(val)方法，val是客户端输入的密码，返回被bcrypt这个库散列的密码
// select: false 让密码只散列一次，编辑时，密码不会被查出来
