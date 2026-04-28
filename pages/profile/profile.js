const app = getApp()
const mock = require('../../data/mock.js')
const util = require('../../utils/util.js')

Page({
  data: {
    isLoggedIn: false,
    userInfo: null,
    targetUserId: '',
    isSelf: true,
    isFollowed: false,
    activeTab: 0,
    tabs: [
      { id: 0, name: '公开', type: 'public' },
      { id: 1, name: '私密', type: 'private' },
      { id: 2, name: '收藏', type: 'collect' },
      { id: 3, name: '点赞', type: 'like' }
    ],
    articles: [],
    loading: true,
    page: 1,
    pageSize: 10,
    hasMore: true
  },

  onLoad: function (options) {
    const targetUserId = options.userId || ''
    const currentUser = app.globalData.userInfo
    const isSelf = !targetUserId || (currentUser && currentUser.id === targetUserId)
    
    this.setData({
      targetUserId,
      isSelf
    })
    
    this.loadUserInfo()
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
    
    this.setData({
      isLoggedIn: app.globalData.isLoggedIn,
      userInfo: app.globalData.userInfo
    })
    
    if (app.globalData.isLoggedIn) {
      this.loadArticles()
    }
  },

  loadUserInfo: function () {
    this.setData({ loading: true })
    
    setTimeout(() => {
      if (this.data.isSelf) {
        if (app.globalData.isLoggedIn) {
          this.setData({
            userInfo: app.globalData.userInfo,
            isLoggedIn: true,
            loading: false
          })
          this.loadArticles()
        } else {
          this.setData({
            loading: false,
            isLoggedIn: false
          })
        }
      } else {
        const user = mock.getUserById(this.data.targetUserId)
        if (user) {
          this.setData({
            userInfo: user,
            loading: false
          })
          this.loadArticles()
        } else {
          this.setData({ loading: false })
          util.showToast('用户不存在', 'none')
        }
      }
    }, 300)
  },

  loadArticles: function (refresh = false) {
    if (!this.data.hasMore && !refresh) return
    
    if (refresh) {
      this.setData({
        page: 1,
        articles: [],
        hasMore: true
      })
    }
    
    const userId = this.data.isSelf && app.globalData.userInfo 
      ? app.globalData.userInfo.id 
      : this.data.targetUserId
    
    const tab = this.data.tabs[this.data.activeTab]
    let options = {
      page: this.data.page,
      pageSize: this.data.pageSize
    }
    
    if (tab.type === 'public') {
      options.userId = userId
      options.isPublic = true
    } else if (tab.type === 'private') {
      options.userId = userId
      options.isPublic = false
    }
    
    setTimeout(() => {
      let result = mock.getArticles(options)
      
      if (tab.type === 'collect' || tab.type === 'like') {
        result = {
          list: mock.articles.slice(0, 3).map(article => ({
            ...article,
            title: tab.type === 'collect' ? '[收藏] ' + article.title : '[点赞] ' + article.title
          })),
          total: 3,
          page: 1,
          pageSize: 10
        }
      }
      
      const newArticles = this.data.page === 1 
        ? result.list 
        : [...this.data.articles, ...result.list]
      
      this.setData({
        articles: newArticles,
        hasMore: result.list.length >= this.data.pageSize,
        page: this.data.page + 1,
        loading: false
      })
    }, 300)
  },

  switchTab: function (e) {
    const tabId = e.currentTarget.dataset.id
    if (tabId === this.data.activeTab) return
    
    this.setData({
      activeTab: tabId,
      page: 1,
      articles: [],
      hasMore: true
    })
    
    this.loadArticles()
  },

  onTapLogin: function () {
    wx.navigateTo({
      url: '/pages/login/login?mode=login'
    })
  },

  onTapLogout: function () {
    wx.showModal({
      title: '确认退出',
      content: '退出登录后将无法查看个人信息',
      success: (res) => {
        if (res.confirm) {
          app.logout()
          this.setData({
            isLoggedIn: false,
            userInfo: null,
            articles: []
          })
          util.showToast('已退出登录', 'success')
        }
      }
    })
  },

  onTapFollow: function () {
    const appInstance = getApp()
    if (!appInstance.globalData.isLoggedIn) {
      appInstance.showLoginModal()
      return
    }
    
    this.setData({
      isFollowed: !this.data.isFollowed
    })
    
    util.showToast(this.data.isFollowed ? '关注成功' : '已取消关注', 'success')
  },

  onTapEdit: function () {
    util.showToast('编辑功能开发中...', 'none')
  },

  onTapSettings: function () {
    wx.navigateTo({
      url: '/pages/settings/settings'
    })
  },

  onTapArticle: function (e) {
    const article = e.currentTarget.dataset.article
    wx.navigateTo({
      url: `/pages/article/article?id=${article.id}`
    })
  },

  onTapFollowList: function () {
    util.showToast('关注列表开发中...', 'none')
  },

  onTapFansList: function () {
    util.showToast('粉丝列表开发中...', 'none')
  },

  onPullDownRefresh: function () {
    if (this.data.isLoggedIn || !this.data.isSelf) {
      this.loadUserInfo()
    }
    wx.stopPullDownRefresh()
  },

  onScrollLower: function () {
    if (this.data.hasMore) {
      this.loadArticles()
    }
  }
})
