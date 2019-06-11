const mongoose = require('mongoose')
const schema = mongoose.Schema

const ArticleSchema = new schema({
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  body: { type: String }
},{
  timestamps: true
})

module.exports = mongoose.model('Article', ArticleSchema)

// timestamps: true  自动添加 createdAt 和 updatedAt 字段， 其类型为 Date