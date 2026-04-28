const util = require('../utils/util.js')

const users = [
  {
    id: 'user_001',
    avatar: '/assets/images/avatar1.jpg',
    nickname: '文艺小青年',
    username: 'wenyi123',
    fansCount: 12580,
    followCount: 234,
    likesCount: 89650,
    bio: '热爱生活，喜欢记录生活中的点点滴滴',
    region: '北京市',
    age: 25,
    gender: 1,
    createTime: '2024-01-15 10:30:00'
  },
  {
    id: 'user_002',
    avatar: '/assets/images/avatar2.jpg',
    nickname: '旅行达人',
    username: 'travel007',
    fansCount: 56890,
    followCount: 156,
    likesCount: 256890,
    bio: '走过很多路，见过很多风景，用文字记录旅行的意义',
    region: '上海市',
    age: 32,
    gender: 2,
    createTime: '2023-06-20 14:20:00'
  },
  {
    id: 'user_003',
    avatar: '/assets/images/avatar3.jpg',
    nickname: '美食探店者',
    username: 'foodie88',
    fansCount: 34520,
    followCount: 421,
    likesCount: 178900,
    bio: '一个热爱美食的吃货，带你发现身边的美味',
    region: '广东省广州市',
    age: 28,
    gender: 1,
    createTime: '2023-09-10 09:15:00'
  },
  {
    id: 'user_004',
    avatar: '/assets/images/avatar4.jpg',
    nickname: '程序员小王',
    username: 'coder_wang',
    fansCount: 8950,
    followCount: 67,
    likesCount: 45680,
    bio: '代码改变世界，技术创造未来。分享编程心得和技术思考',
    region: '浙江省杭州市',
    age: 27,
    gender: 1,
    createTime: '2024-02-28 16:45:00'
  }
]

const articles = [
  {
    id: 'art_001',
    userId: 'user_002',
    author: {
      id: 'user_002',
      avatar: '/assets/images/avatar2.jpg',
      nickname: '旅行达人'
    },
    title: '云南大理：风花雪月的邂逅',
    content: '大理，一个让人魂牵梦绕的地方。清晨的洱海，薄雾笼罩，如诗如画。沿着环海公路骑行，微风拂面，阳光洒在海面上，波光粼粼。\n\n喜洲古镇的白族建筑，青瓦白墙，雕梁画栋，诉说着千年的历史。古城的五华楼上，俯瞰整个大理城，远处的苍山连绵起伏，近处的洱海碧波荡漾。\n\n傍晚时分，双廊古镇的海边，找一家临海的客栈，品一杯普洱茶，看夕阳西下，渔舟唱晚。这一刻，时间仿佛静止了，所有的烦恼都烟消云散。\n\n大理的美，不是用语言能够形容的。它需要你亲自去感受，去体验，去融入这片神奇的土地。',
    images: [
      '/assets/images/article1_1.jpg',
      '/assets/images/article1_2.jpg',
      '/assets/images/article1_3.jpg'
    ],
    categoryId: 3,
    categoryName: '旅行游记',
    musicId: 1,
    musicName: '轻音乐 - 清晨',
    musicUrl: '/assets/music/morning.mp3',
    viewCount: 56890,
    likeCount: 8920,
    commentCount: 1256,
    collectCount: 4580,
    shareCount: 890,
    isPublic: true,
    status: 1,
    createTime: '2024-04-10 08:30:00',
    updateTime: '2024-04-10 08:30:00'
  },
  {
    id: 'art_002',
    userId: 'user_003',
    author: {
      id: 'user_003',
      avatar: '/assets/images/avatar3.jpg',
      nickname: '美食探店者'
    },
    title: '广州早茶文化：一盅两件的慢生活',
    content: '广州人的一天，从早茶开始。清晨六点，茶楼已经开始热闹起来。老人们提着鸟笼，三五成群地走进茶楼，找一个熟悉的位置，点上一壶铁观音，再来几样点心，这就是广州人最爱的"一盅两件"。\n\n虾饺是早茶的必点，晶莹剔透的外皮包裹着鲜美的虾仁，一口咬下去，Q弹的口感让人回味无穷。烧卖皇，馅料饱满，顶部的鱼子酱增添了一丝奢华。凤爪经过长时间的蒸制，软糯入味，入口即化。\n\n除了这些经典的点心，广州早茶还有各式各样的创新品种。流沙包内馅香甜，奶黄浓郁。肠粉滑嫩，配着特制的酱油，简单却美味。艇仔粥料足味美，生滚粥现点现煮，新鲜可口。\n\n早茶不仅是一种饮食文化，更是广州人生活方式的体现。在这里，没有快节奏的喧嚣，只有悠闲的时光。人们边吃边聊，谈天说地，享受着慢生活的美好。',
    images: [
      '/assets/images/article2_1.jpg',
      '/assets/images/article2_2.jpg'
    ],
    categoryId: 4,
    categoryName: '美食分享',
    musicId: 2,
    musicName: '轻音乐 - 午后',
    musicUrl: '/assets/music/afternoon.mp3',
    viewCount: 34560,
    likeCount: 5680,
    commentCount: 890,
    collectCount: 3250,
    shareCount: 670,
    isPublic: true,
    status: 1,
    createTime: '2024-04-08 12:15:00',
    updateTime: '2024-04-08 12:15:00'
  },
  {
    id: 'art_003',
    userId: 'user_001',
    author: {
      id: 'user_001',
      avatar: '/assets/images/avatar1.jpg',
      nickname: '文艺小青年'
    },
    title: '那个夏天，我们的故事',
    content: '记得那年夏天，我们一起在海边度过。海风轻轻吹过，带着咸咸的味道。我们手牵着手，在沙滩上留下一串串脚印。海浪一次次涌来，又一次次退去，就像我们的青春，充满了激情与活力。\n\n傍晚时分，我们坐在礁石上看日落。天空被染成了绚丽的橙色和紫色，远处的渔船点点，海面波光粼粼。你靠在我的肩膀上，说这是你见过最美的风景。那一刻，我多么希望时间能够静止，让这一刻成为永恒。\n\n后来，我们各奔东西，为了梦想而奋斗。但是那个夏天的记忆，永远留在了我的心里。每当我看到大海，就会想起你，想起我们一起度过的那段美好时光。\n\n或许，青春就是这样，有欢笑，有泪水，有相聚，有别离。但正是这些经历，让我们的人生变得丰富多彩。感谢你出现在我的生命中，给我留下了如此美好的回忆。',
    images: [
      '/assets/images/article3_1.jpg',
      '/assets/images/article3_2.jpg',
      '/assets/images/article3_3.jpg',
      '/assets/images/article3_4.jpg'
    ],
    categoryId: 1,
    categoryName: '情感故事',
    musicId: 3,
    musicName: '轻音乐 - 夜晚',
    musicUrl: '/assets/music/night.mp3',
    viewCount: 78950,
    likeCount: 12580,
    commentCount: 2340,
    collectCount: 8920,
    shareCount: 1560,
    isPublic: true,
    status: 1,
    createTime: '2024-04-05 20:45:00',
    updateTime: '2024-04-05 20:45:00'
  },
  {
    id: 'art_004',
    userId: 'user_004',
    author: {
      id: 'user_004',
      avatar: '/assets/images/avatar4.jpg',
      nickname: '程序员小王'
    },
    title: '前端性能优化：从理论到实践',
    content: '作为一名前端开发工程师，性能优化是我们永恒的话题。今天我来分享一些在实际项目中总结的性能优化经验。\n\n首先，资源加载优化。图片是页面中体积最大的资源，我们需要对图片进行优化。使用WebP格式可以减少约30%的体积。图片懒加载也是一个重要的优化手段，只加载可视区域内的图片。\n\n其次，代码优化。JavaScript方面，避免全局变量，减少DOM操作，使用事件委托。CSS方面，避免通配符选择器，减少层级，使用CSS3硬件加速。\n\n再者，网络优化。使用CDN加速，开启Gzip压缩，合理配置缓存策略。对于单页应用，可以使用路由懒加载，按需加载组件。\n\n最后，监控与分析。使用Lighthouse进行性能审计，使用Web Vitals监控关键指标。建立性能监控系统，及时发现和解决性能问题。\n\n性能优化不是一蹴而就的，而是一个持续的过程。我们需要在开发的每个环节都考虑性能，为用户提供流畅的体验。',
    images: [
      '/assets/images/article4_1.jpg',
      '/assets/images/article4_2.jpg'
    ],
    categoryId: 5,
    categoryName: '技术文章',
    musicId: 4,
    musicName: '钢琴曲 - 雨滴',
    musicUrl: '/assets/music/rain.mp3',
    viewCount: 15680,
    likeCount: 2350,
    commentCount: 420,
    collectCount: 1890,
    shareCount: 320,
    isPublic: true,
    status: 1,
    createTime: '2024-04-03 14:20:00',
    updateTime: '2024-04-03 14:20:00'
  },
  {
    id: 'art_005',
    userId: 'user_001',
    author: {
      id: 'user_001',
      avatar: '/assets/images/avatar1.jpg',
      nickname: '文艺小青年'
    },
    title: '深夜随笔：关于孤独与成长',
    content: '夜深了，窗外的路灯还在闪烁。独自一人坐在书桌前，思绪万千。\n\n有人说，孤独是成长的必修课。深以为然。年轻时，我们害怕孤独，总想要有人陪伴。但随着年龄的增长，我们渐渐发现，孤独其实是一种常态，也是一种宝贵的财富。\n\n在孤独中，我们学会了与自己对话。不再依赖他人的认可，不再为了迎合他人而改变自己。我们开始真正地了解自己，知道自己想要什么，不想要什么。\n\n在孤独中，我们学会了独立思考。不再随波逐流，不再人云亦云。我们有了自己的观点和判断，学会了用理性的眼光看待这个世界。\n\n在孤独中，我们学会了自我提升。没有了外界的干扰，我们可以静下心来学习和思考。阅读、写作、思考，这些在孤独中进行的活动，让我们的内心变得更加充实和强大。\n\n所以，不要害怕孤独。拥抱它，享受它，在孤独中成长，在孤独中绽放。',
    images: [
      '/assets/images/article5_1.jpg'
    ],
    categoryId: 2,
    categoryName: '生活随笔',
    musicId: 5,
    musicName: '纯音乐 - 星空',
    musicUrl: '/assets/music/stars.mp3',
    viewCount: 45680,
    likeCount: 6890,
    commentCount: 1250,
    collectCount: 5620,
    shareCount: 980,
    isPublic: true,
    status: 1,
    createTime: '2024-04-01 23:30:00',
    updateTime: '2024-04-01 23:30:00'
  }
]

const comments = [
  {
    id: 'cmt_001',
    articleId: 'art_001',
    userId: 'user_001',
    user: {
      id: 'user_001',
      avatar: '/assets/images/avatar1.jpg',
      nickname: '文艺小青年'
    },
    content: '写得真好！去年我也去了大理，确实是一个让人留恋的地方。特别是双廊的日落，太美了！',
    likeCount: 156,
    isLiked: false,
    createTime: '2024-04-10 10:20:00',
    replies: [
      {
        id: 'reply_001',
        commentId: 'cmt_001',
        userId: 'user_002',
        user: {
          id: 'user_002',
          avatar: '/assets/images/avatar2.jpg',
          nickname: '旅行达人'
        },
        content: '哈哈，是的！双廊是我最喜欢的地方，下次有机会还要再去！',
        likeCount: 45,
        isLiked: false,
        createTime: '2024-04-10 11:05:00'
      }
    ]
  },
  {
    id: 'cmt_002',
    articleId: 'art_001',
    userId: 'user_003',
    user: {
      id: 'user_003',
      avatar: '/assets/images/avatar3.jpg',
      nickname: '美食探店者'
    },
    content: '大理的美食也很棒！推荐尝尝乳扇和洱海鱼，还有那里的鲜花饼，真的很好吃！',
    likeCount: 89,
    isLiked: false,
    createTime: '2024-04-10 14:30:00',
    replies: []
  },
  {
    id: 'cmt_003',
    articleId: 'art_003',
    userId: 'user_004',
    user: {
      id: 'user_004',
      avatar: '/assets/images/avatar4.jpg',
      nickname: '程序员小王'
    },
    content: '看哭了...想起了我的初恋。青春总是充满遗憾，但正是这些遗憾让我们成长。',
    likeCount: 234,
    isLiked: false,
    createTime: '2024-04-06 09:15:00',
    replies: [
      {
        id: 'reply_002',
        commentId: 'cmt_003',
        userId: 'user_001',
        user: {
          id: 'user_001',
          avatar: '/assets/images/avatar1.jpg',
          nickname: '文艺小青年'
        },
        content: '感谢你的理解。每个人的青春都有不同的故事，但那种青涩和美好是共通的。',
        likeCount: 67,
        isLiked: false,
        createTime: '2024-04-06 10:30:00'
      }
    ]
  }
]

const getArticles = (options = {}) => {
  const { page = 1, pageSize = 10, categoryId, userId, isPublic, keyword } = options
  
  let filtered = [...articles]
  
  if (categoryId) {
    filtered = filtered.filter(item => item.categoryId === categoryId)
  }
  
  if (userId) {
    filtered = filtered.filter(item => item.userId === userId)
  }
  
  if (isPublic !== undefined) {
    filtered = filtered.filter(item => item.isPublic === isPublic)
  }
  
  if (keyword) {
    const keywordLower = keyword.toLowerCase()
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(keywordLower) ||
      item.content.toLowerCase().includes(keywordLower)
    )
  }
  
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  
  return {
    list: filtered.slice(startIndex, endIndex),
    total: filtered.length,
    page,
    pageSize
  }
}

const getArticleById = (id) => {
  return articles.find(item => item.id === id) || null
}

const getUsers = (options = {}) => {
  const { page = 1, pageSize = 10, keyword } = options
  
  let filtered = [...users]
  
  if (keyword) {
    const keywordLower = keyword.toLowerCase()
    filtered = filtered.filter(item => 
      item.nickname.toLowerCase().includes(keywordLower) ||
      item.username.toLowerCase().includes(keywordLower)
    )
  }
  
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  
  return {
    list: filtered.slice(startIndex, endIndex),
    total: filtered.length,
    page,
    pageSize
  }
}

const getUserById = (id) => {
  return users.find(item => item.id === id) || null
}

const getComments = (articleId, options = {}) => {
  const { page = 1, pageSize = 10 } = options
  
  const articleComments = comments.filter(item => item.articleId === articleId)
  
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  
  return {
    list: articleComments.slice(startIndex, endIndex),
    total: articleComments.length,
    page,
    pageSize
  }
}

const createArticle = (data) => {
  const newArticle = {
    id: 'art_' + util.generateId(),
    userId: data.userId,
    author: data.author,
    title: data.title,
    content: data.content,
    images: data.images || [],
    categoryId: data.categoryId,
    categoryName: data.categoryName,
    musicId: data.musicId,
    musicName: data.musicName,
    musicUrl: data.musicUrl,
    viewCount: 0,
    likeCount: 0,
    commentCount: 0,
    collectCount: 0,
    shareCount: 0,
    isPublic: data.isPublic !== undefined ? data.isPublic : true,
    status: 1,
    createTime: util.formatTime(new Date()),
    updateTime: util.formatTime(new Date())
  }
  
  articles.unshift(newArticle)
  return newArticle
}

const createComment = (data) => {
  const newComment = {
    id: 'cmt_' + util.generateId(),
    articleId: data.articleId,
    userId: data.userId,
    user: data.user,
    content: data.content,
    likeCount: 0,
    isLiked: false,
    createTime: util.formatTime(new Date()),
    replies: []
  }
  
  comments.unshift(newComment)
  
  const article = getArticleById(data.articleId)
  if (article) {
    article.commentCount++
  }
  
  return newComment
}

module.exports = {
  users,
  articles,
  comments,
  getArticles,
  getArticleById,
  getUsers,
  getUserById,
  getComments,
  createArticle,
  createComment
}
