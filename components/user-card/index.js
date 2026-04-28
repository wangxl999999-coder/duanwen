Component({
  properties: {
    user: {
      type: Object,
      value: {}
    },
    showFollow: {
      type: Boolean,
      value: true
    },
    isFollowed: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    onTapCard() {
      const user = this.properties.user
      wx.navigateTo({
        url: `/pages/profile/profile?userId=${user.id}`
      })
    },

    onTapFollow(e) {
      e.stopPropagation()
      const app = getApp()
      if (!app.globalData.isLoggedIn) {
        app.showLoginModal()
        return
      }
      
      this.triggerEvent('follow', {
        userId: this.properties.user.id,
        isFollowed: !this.properties.isFollowed
      })
    }
  }
})
