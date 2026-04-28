const config = require('./utils/config.js')
const store = require('./utils/store.js')

App({
  globalData: {
    userInfo: null,
    isLoggedIn: false,
    currentArticle: null,
    bgAudioManager: null
  },

  onLaunch: function () {
    this.checkLoginStatus()
    this.initBackgroundAudio()
    this.loadConfig()
  },

  loadConfig: function () {
    console.log('应用配置:', config.APP_NAME)
  },

  checkLoginStatus: function () {
    const userInfo = store.get('userInfo')
    const token = store.get('token')
    if (userInfo && token) {
      this.globalData.userInfo = userInfo
      this.globalData.isLoggedIn = true
    }
  },

  initBackgroundAudio: function () {
    const bgAudioManager = wx.getBackgroundAudioManager()
    bgAudioManager.title = '短文背景音乐'
    bgAudioManager.epname = '短文'
    bgAudioManager.singer = '未知'
    bgAudioManager.coverImgUrl = ''
    this.globalData.bgAudioManager = bgAudioManager
  },

  playBackgroundMusic: function (src, title = '背景音乐') {
    const bgAudioManager = this.globalData.bgAudioManager
    bgAudioManager.src = src
    bgAudioManager.title = title
  },

  pauseBackgroundMusic: function () {
    const bgAudioManager = this.globalData.bgAudioManager
    bgAudioManager.pause()
  },

  stopBackgroundMusic: function () {
    const bgAudioManager = this.globalData.bgAudioManager
    bgAudioManager.stop()
  },

  login: function (userInfo, token) {
    this.globalData.userInfo = userInfo
    this.globalData.isLoggedIn = true
    store.set('userInfo', userInfo)
    store.set('token', token)
  },

  logout: function () {
    this.globalData.userInfo = null
    this.globalData.isLoggedIn = false
    store.remove('userInfo')
    store.remove('token')
  },

  showLoginModal: function () {
    wx.showModal({
      title: '请先登录',
      content: '此功能需要登录后才能使用',
      confirmText: '去登录',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  },

  checkAuth: function (callback) {
    if (this.globalData.isLoggedIn) {
      if (callback) callback(true)
      return true
    } else {
      this.showLoginModal()
      if (callback) callback(false)
      return false
    }
  }
})
