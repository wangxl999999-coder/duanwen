const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    isLoggedIn: false,
    userInfo: null
  },

  onLoad: function () {
    this.setData({
      isLoggedIn: app.globalData.isLoggedIn,
      userInfo: app.globalData.userInfo
    })
  },

  onTapProfile: function () {
    if (!app.globalData.isLoggedIn) {
      app.showLoginModal()
      return
    }
    util.showToast('编辑资料功能开发中...', 'none')
  },

  onTapAccount: function () {
    if (!app.globalData.isLoggedIn) {
      app.showLoginModal()
      return
    }
    util.showToast('账号设置功能开发中...', 'none')
  },

  onTapPrivacy: function () {
    util.showToast('隐私设置功能开发中...', 'none')
  },

  onTapNotification: function () {
    util.showToast('通知设置功能开发中...', 'none')
  },

  onTapAbout: function () {
    util.showToast('关于我们功能开发中...', 'none')
  },

  onTapFeedback: function () {
    util.showToast('意见反馈功能开发中...', 'none')
  },

  onTapClearCache: function () {
    wx.showModal({
      title: '清除缓存',
      content: '确定要清除缓存吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorage({
            success: () => {
              util.showToast('清除成功', 'success')
            }
          })
        }
      }
    })
  },

  onTapLogout: function () {
    if (!app.globalData.isLoggedIn) {
      util.showToast('您还没有登录', 'none')
      return
    }
    
    wx.showModal({
      title: '确认退出',
      content: '退出登录后将无法查看个人信息',
      success: (res) => {
        if (res.confirm) {
          app.logout()
          this.setData({
            isLoggedIn: false,
            userInfo: null
          })
          util.showToast('已退出登录', 'success')
          
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/index/index'
            })
          }, 1000)
        }
      }
    })
  },

  goBack: function () {
    wx.navigateBack()
  }
})
