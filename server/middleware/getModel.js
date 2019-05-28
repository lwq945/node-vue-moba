 // 根据resource url 找到对应的model
module.exports = options => {
  return async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../models/${modelName}`)
    next()
  }
}