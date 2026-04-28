Component({
  properties: {
    comment: {
      type: Object,
      value: {}
    }
  },

  data: {
    isLiked: false,
    likeCount: 0,
    showReplyInput: false
  },

  lifetimes: {
    attached() {
      const comment = this.properties.comment
      this.setData({
        isLiked: comment.isLiked || false,
        likeCount: comment.likeCount || 0
      })
    }
  },

  methods: {
    onTapLike() {
      const app = getApp()
      if (!app.globalData.isLoggedIn) {
        app.showLoginModal()
        return
      }
      
      const newIsLiked = !this.data.isLiked
      const newLikeCount = this.data.likeCount + (newIsLiked ? 1 : -1)
      
      this.setData({
        isLiked: newIsLiked,
        likeCount: newLikeCount
      })
      
      this.triggerEvent('like', {
        commentId: this.properties.comment.id,
        isLiked: newIsLiked
      })
    },

    onTapReply() {
      const app = getApp()
      if (!app.globalData.isLoggedIn) {
        app.showLoginModal()
        return
      }
      
      this.setData({
        showReplyInput: !this.data.showReplyInput
      })
      
      if (!this.data.showReplyInput) {
        this.triggerEvent('reply', {
          commentId: this.properties.comment.id,
          replyTo: this.properties.comment.user
        })
      }
    },

    onTapUser() {
      const comment = this.properties.comment
      wx.navigateTo({
        url: `/pages/profile/profile?userId=${comment.user.id}`
      })
    }
  }
})
