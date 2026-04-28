const app = getApp()
const mock = require('../../data/mock.js')
const util = require('../../utils/util.js')
const config = require('../../utils/config.js')

Page({
  data: {
    articles: [],
    currentIndex: 0,
    categories: config.CATEGORIES,
    selectedCategory: 0,
    loading: true,
    hasMore: true,
    page: 1,
    pageSize: 5,
    isPlaying: false,
    likedArticles: {},
    collectedArticles: {},
    followedUsers: {},
    showCategoryPanel: false
  },

  onLoad: function () {
    this.loadArticles()
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  onUnload: function () {
    app.stopBackgroundMusic()
  },

  loadArticles: function () {
    if (!this.data.hasMore) return
    
    this.setData({ loading: true })
    
    setTimeout(() => {
      const options = {
        page: this.data.page,
        pageSize: this.data.pageSize
      }
      
      if (this.data.selectedCategory > 0) {
        options.categoryId = this.data.selectedCategory
      }
      
      const result = mock.getArticles(options)
      
      const newArticles = this.data.page === 1 
        ? result.list 
        : [...this.data.articles, ...result.list]
      
      this.setData({
        articles: newArticles,
        loading: false,
        hasMore: result.list.length >= this.data.pageSize,
        page: this.data.page + 1
      })
      
      if (newArticles.length > 0 && this.data.currentIndex === 0) {
        this.playMusic(0)
      }
    }, 500)
  },

  onSwiperChange: function (e) {
    const currentIndex = e.detail.current
    this.setData({ currentIndex })
    
    this.playMusic(currentIndex)
    
    const article = this.data.articles[currentIndex]
    if (article) {
      article.viewCount = (article.viewCount || 0) + 1
      this.setData({
        [`articles[${currentIndex}]`]: article
      })
    }
    
    if (currentIndex >= this.data.articles.length - 2 && this.data.hasMore) {
      this.loadArticles()
    }
  },

  playMusic: function (index) {
    const article = this.data.articles[index]
    if (!article || !article.musicUrl) {
      app.pauseBackgroundMusic()
      this.setData({ isPlaying: false })
      return
    }
    
    app.playBackgroundMusic(article.musicUrl, article.musicName)
    this.setData({ isPlaying: true })
  },

  toggleMusic: function () {
    if (this.data.isPlaying) {
      app.pauseBackgroundMusic()
    } else {
      const article = this.data.articles[this.data.currentIndex]
      if (article && article.musicUrl) {
        app.playBackgroundMusic(article.musicUrl, article.musicName)
      }
    }
    this.setData({ isPlaying: !this.data.isPlaying })
  },

  toggleCategoryPanel: function () {
    this.setData({
      showCategoryPanel: !this.data.showCategoryPanel
    })
  },

  selectCategory: function (e) {
    const categoryId = e.currentTarget.dataset.id
    this.setData({
      selectedCategory: categoryId,
      showCategoryPanel: false,
      page: 1,
      articles: [],
      currentIndex: 0,
      hasMore: true
    })
    this.loadArticles()
  },

  onTapLike: function (e) {
    const index = e.currentTarget.dataset.index
    const article = this.data.articles[index]
    const appInstance = getApp()
    
    if (!appInstance.globalData.isLoggedIn) {
      appInstance.showLoginModal()
      return
    }
    
    const isLiked = this.data.likedArticles[article.id]
    const newLikeCount = article.likeCount + (isLiked ? -1 : 1)
    
    this.setData({
      [`likedArticles.${article.id}`]: !isLiked,
      [`articles[${index}].likeCount`]: newLikeCount
    })
    
    util.showToast(isLiked ? '已取消点赞' : '点赞成功', 'success')
  },

  onTapCollect: function (e) {
    const index = e.currentTarget.dataset.index
    const article = this.data.articles[index]
    const appInstance = getApp()
    
    if (!appInstance.globalData.isLoggedIn) {
      appInstance.showLoginModal()
      return
    }
    
    const isCollected = this.data.collectedArticles[article.id]
    const newCollectCount = article.collectCount + (isCollected ? -1 : 1)
    
    this.setData({
      [`collectedArticles.${article.id}`]: !isCollected,
      [`articles[${index}].collectCount`]: newCollectCount
    })
    
    util.showToast(isCollected ? '已取消收藏' : '收藏成功', 'success')
  },

  onTapFollow: function (e) {
    const index = e.currentTarget.dataset.index
    const article = this.data.articles[index]
    const appInstance = getApp()
    
    if (!appInstance.globalData.isLoggedIn) {
      appInstance.showLoginModal()
      return
    }
    
    const isFollowed = this.data.followedUsers[article.author.id]
    
    this.setData({
      [`followedUsers.${article.author.id}`]: !isFollowed
    })
    
    util.showToast(isFollowed ? '已取消关注' : '关注成功', 'success')
  },

  onTapComment: function (e) {
    const index = e.currentTarget.dataset.index
    const article = this.data.articles[index]
    const appInstance = getApp()
    
    if (!appInstance.globalData.isLoggedIn) {
      appInstance.showLoginModal()
      return
    }
    
    wx.navigateTo({
      url: `/pages/article/article?id=${article.id}&focusComment=true`
    })
  },

  onTapShare: function (e) {
    const index = e.currentTarget.dataset.index
    const article = this.data.articles[index]
    
    wx.showActionSheet({
      itemList: ['分享到微信好友', '分享到朋友圈', '生成海报'],
      success: (res) => {
        util.showToast('分享功能开发中...', 'none')
      }
    })
  },

  onTapAuthor: function (e) {
    const index = e.currentTarget.dataset.index
    const article = this.data.articles[index]
    
    wx.navigateTo({
      url: `/pages/profile/profile?userId=${article.author.id}`
    })
  },

  onPullDownRefresh: function () {
    this.setData({
      page: 1,
      articles: [],
      currentIndex: 0,
      hasMore: true
    })
    this.loadArticles()
    wx.stopPullDownRefresh()
  },

  onShareAppMessage: function () {
    const article = this.data.articles[this.data.currentIndex]
    if (article) {
      return {
        title: article.title,
        path: `/pages/article/article?id=${article.id}`,
        imageUrl: article.images[0] || ''
      }
    }
  }
})
