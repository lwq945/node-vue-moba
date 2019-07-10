module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const mongoose = require('mongoose')
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  const Hero = mongoose.model('Hero')

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
      newsList: await Article.find()
        .where({
          categories: { $in: subCats }
        })
        .populate('categories')
        .limit(5)
        .lean()
    })

    //给每个分类的newsList的每一项添加字段 categoryName
    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName =
          cat.name === '热门' ? news.categories[0].name : cat.name
        return news
      })
      return cat
    })

    res.send(cats)
  })

  // 初始化英雄数据
  router.get('/heroes/init', async (req, res) => {
    await Hero.deleteMany({})

    const rawData = [
      {
        categoryName: '热门',
        heroes: [
          {
            name: '后羿',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg'
          },
          {
            name: '孙悟空',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg'
          },
          {
            name: '铠',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg'
          },
          {
            name: '鲁班七号',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg'
          },
          {
            name: '亚瑟',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg'
          },
          {
            name: '甄姬',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg'
          },
          {
            name: '孙尚香',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg'
          },
          {
            name: '典韦',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg'
          },
          {
            name: '庄周',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg'
          },
          {
            name: '吕布',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg'
          }
        ]
      },
      {
        categoryName: '战士',
        heroes: [
          {
            name: '赵云',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg'
          },
          {
            name: '钟无艳',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg'
          },
          {
            name: '吕布',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg'
          },
          {
            name: '曹操',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg'
          },
          {
            name: '典韦',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg'
          },
          {
            name: '宫本武藏',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg'
          },
          {
            name: '达摩',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg'
          },
          {
            name: '老夫子',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg'
          },
          {
            name: '关羽',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg'
          },
          {
            name: '露娜',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg'
          },
          {
            name: '花木兰',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg'
          },
          {
            name: '亚瑟',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg'
          },
          {
            name: '孙悟空',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg'
          },
          {
            name: '刘备',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg'
          },
          {
            name: '杨戬',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg'
          },
          {
            name: '雅典娜',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg'
          },
          {
            name: '哪吒',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg'
          },
          {
            name: '铠',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg'
          },
          {
            name: '狂铁',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg'
          },
          {
            name: '李信',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg'
          },
          {
            name: '盘古',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg'
          }
        ]
      },
      {
        categoryName: '法师',
        heroes: [
          {
            name: '小乔',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg'
          },
          {
            name: '墨子',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg'
          },
          {
            name: '妲己',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg'
          },
          {
            name: '嬴政',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg'
          },
          {
            name: '高渐离',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg'
          },
          {
            name: '扁鹊',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg'
          },
          {
            name: '芈月',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg'
          },
          {
            name: '周瑜',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg'
          },
          {
            name: '甄姬',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg'
          },
          {
            name: '武则天',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg'
          },
          {
            name: '貂蝉',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg'
          },
          {
            name: '安琪拉',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg'
          },
          {
            name: '姜子牙',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg'
          },
          {
            name: '王昭君',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg'
          },
          {
            name: '张良',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg'
          },
          {
            name: '不知火舞',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg'
          },
          {
            name: '钟馗',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg'
          },
          {
            name: '诸葛亮',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg'
          },
          {
            name: '干将莫邪',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg'
          },
          {
            name: '女娲',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg'
          },
          {
            name: '杨玉环',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg'
          },
          {
            name: '弈星',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg'
          },
          {
            name: '米莱狄',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg'
          },
          {
            name: '沈梦溪',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg'
          },
          {
            name: '上官婉儿',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg'
          },
          {
            name: '嫦娥',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg'
          }
        ]
      },
      {
        categoryName: '坦克',
        heroes: [
          {
            name: '廉颇',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg'
          },
          {
            name: '刘禅',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg'
          },
          {
            name: '白起',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg'
          },
          {
            name: '夏侯惇',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg'
          },
          {
            name: '项羽',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg'
          },
          {
            name: '程咬金',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg'
          },
          {
            name: '刘邦',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg'
          },
          {
            name: '牛魔',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg'
          },
          {
            name: '张飞',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg'
          },
          {
            name: '东皇太一',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg'
          },
          {
            name: '苏烈',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg'
          },
          {
            name: '梦奇',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg'
          },
          {
            name: '孙策',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg'
          },
          {
            name: '猪八戒',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg'
          }
        ]
      },
      {
        categoryName: '刺客',
        heroes: [
          {
            name: '阿轲',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg'
          },
          {
            name: '李白',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg'
          },
          {
            name: '韩信',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg'
          },
          {
            name: '兰陵王',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg'
          },
          {
            name: '娜可露露',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg'
          },
          {
            name: '橘右京',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg'
          },
          {
            name: '百里玄策',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg'
          },
          {
            name: '裴擒虎',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg'
          },
          {
            name: '元歌',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg'
          },
          {
            name: '司马懿',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg'
          },
          {
            name: '云中君',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg'
          }
        ]
      },
      {
        categoryName: '射手',
        heroes: [
          {
            name: '孙尚香',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg'
          },
          {
            name: '鲁班七号',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg'
          },
          {
            name: '马可波罗',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg'
          },
          {
            name: '狄仁杰',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg'
          },
          {
            name: '后羿',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg'
          },
          {
            name: '李元芳',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg'
          },
          {
            name: '虞姬',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg'
          },
          {
            name: '成吉思汗',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg'
          },
          {
            name: '黄忠',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg'
          },
          {
            name: '百里守约',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg'
          },
          {
            name: '公孙离',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg'
          },
          {
            name: '伽罗',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg'
          }
        ]
      },
      {
        categoryName: '辅助',
        heroes: [
          {
            name: '庄周',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg'
          },
          {
            name: '孙膑',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg'
          },
          {
            name: '蔡文姬',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg'
          },
          {
            name: '太乙真人',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg'
          },
          {
            name: '大乔',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg'
          },
          {
            name: '鬼谷子',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg'
          },
          {
            name: '明世隐',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg'
          },
          {
            name: '盾山',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg'
          },
          {
            name: '瑶',
            avatar:
              'https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg'
          }
        ]
      }
    ]

    for (let cate of rawData) {
      if (cate.categoryName === '热门') {
        continue
      }

      const category = await Category.findOne({ name: cate.categoryName })

      cate.heroes = cate.heroes.map(hero => {
        hero.categories = [category]
        return hero
      })

      await Hero.insertMany(cate.heroes)
    }

    res.send(await Hero.find())
  })

  // 获取英雄列表
  router.get('/heroes/list', async (req, res) => {
    // 先找出顶级分类
    const parent = await Category.findOne().where({ name: '英雄分类' })
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
          from: 'heroes', // 关联集合的名称(小写复数)
          localField: '_id', // 本地键
          foreignField: 'categories', //外键(关联集合的字段)
          as: 'heroList' // 输出后的名称
        }
      }
    ])

    // 返回所有子分类的_id
    const subCats = cats.map(v => v._id)
    // 添加字段 '热门'
    cats.unshift({
      name: '热门',
      heroList: await Hero.find()
        .where({
          categories: { $in: subCats }
        })
        .limit(10)
        .lean()
    })

    res.send(cats)
  })

  // 获取英雄详情
  router.get('/heroes/:id', async (req, res) => {
    const data = await Hero.findById(req.params.id).populate('categories items1 items2 partners.hero').lean()
    res.send(data)
  })

  // 获取文章详情
  router.get('/articles/:id', async (req, res) => {
    const data = await Article.findById(req.params.id).lean()
    data.related = await Article.find().where({
      categories: { $in: data.categories }
    }).limit(2)
    res.send(data)
  })

  app.use('/web/api', router)
}
