module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const mongoose = require('mongoose')
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')

  // 初始化新闻数据
  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({ name: '新闻分类' })
    const cats = await Category.find()
      .where({ parent: parent })
      .lean() //lean()将结果(mongoose Documents)转换成普通js对象返回
    const newsTitles = [
      '夏日新版本“稷下星之队”即将6月上线',
      '王者荣耀携手两大博物馆 走进稷下学宫',
      '王者大陆第一学院【稷下】档案',
      '云端梦境 | 全新福利系统！助你美梦成真~',
      '跨界合作丨控油神装登场，唤醒无限护肤力量！',
      '6月11日全服不停机更新公告',
      '【已修复】王者大陆的端午宝藏活动页面异常问题说明',
      '6月7日体验服停机更新公告',
      '关于2019年KPL春季赛总决赛 RNG.M vs eStarPro 补赛、赛果及世界冠军杯安排公告',
      '净化游戏环境声明及处罚公告（6月3日-6月9日）',
      '活力夏日活动周 王者峡谷好礼多',
      '王者大陆的端午宝藏活动公告',
      '峡谷庆端午 惊喜礼不断',
      '【场里场外，一起开黑】感恩礼包放送',
      'KPL总决赛来临之际 场里场外一起开黑/观赛活动开启！',
      '【6月15日 再战西安 · 2019年KPL春季赛总决赛重启公告】',
      '王者荣耀世界冠军杯荣耀来袭，KPL赛区选拔赛谁能突围而出？',
      '【关于2019年KPL春季赛总决赛门票退换及异地用户现场观赛补贴公告】',
      'KRKPL快讯：运营快攻两不误，EMC4：1斩落CW',
      'KRKPL：还在用庄周打辅助？JY边路庄周带你越塔莽！'
    ]
    const newsList = newsTitles.map(title => {
      // 根据返回的值(-1,0,1)进行排序
      const catsRandom = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        categories: catsRandom.slice(0, 2), // 取排序好的前两个
        title: title
      }
    })
    // 以任意条件删除Article中的数据
    await Article.deleteMany({})
    await Article.insertMany(newsList)
    res.send(newsList)
  })

  // 获取新闻列表
  router.get('/news/list', async (req, res) => {
    // 先找出顶级分类
    const parent = await Category.findOne().where({ name: '新闻分类' })
    //model.aggregate([]) 使用 聚合 进行关联查询，可以执行多次的条件
    const cats = await Category.aggregate([
      { 
        // 过滤查询：找出字段parent的值为顶级分类_id的所有子分类
        $match: { 
          parent: parent._id 
        } 
      },
      {
        // 关联查询：找出子分类对应的文章标题数据
        $lookup: {
          from: 'articles', // 关联集合的名称(小写复数)
          localField: '_id', // 本地键
          foreignField: 'categories', //外键(关联集合的字段)
          as: 'newsList' // 输出后的名称
        }
      },
      {
        // 限制newsList的数据条数
        $addFields: {
          newsList: { $slice: ['$newsList', 5] }
        }
      }
    ])

    // 返回所有子分类的_id
    const subCats = cats.map(v => v._id)
    // 添加字段 '热门'
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: { $in: subCats }
      }).populate('categories').limit(5).lean()
    })

    //给每个分类的newsList的每一项添加字段 categoryName
    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = (cat.name === '热门') ? news.categories[0].name : cat.name
        return news
      })
      return cat
    })

    res.send(cats)
  })

  app.use('/web/api', router)
}
