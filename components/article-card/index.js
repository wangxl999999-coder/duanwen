Component({
  properties: {
    article: {
      type: Object,
      value: {}
    },
    showAuthor: {
      type: Boolean,
      value: true
    }
  },

  data: {
    likeStatus: false
  },

  lifetimes: {
    attached() {
      this.setData({
        likeStatus: this.data.article.isLiked || false
      })
    }
  },

  methods: {
    onTapCard() {
      const article = this.properties.article
      wx.navigateTo({
        url: `/pages/article/article?id=${article.id}`
      })
    },

    onTapAuthor(e) {
      e.stopPropagation()
      const article = this.properties.article
      wx.navigateTo({
        url: `/pages/profile/profile?userId=${article.author.id}`
      })
    },

    onTapLike(e) {
      e.stopPropagation()
      const app = getApp()
      if (!app.globalData.isLoggedIn) {
        app.showLoginModal()
        return
      }
      
      const article = this.properties.article
      const newLikeStatus = !this.data.likeStatus
      const likeCount = article.likeCount + (newLikeStatus ? 1 : -1)
      
      this.setData({
        likeStatus: newLikeStatus
      })
      
      this.triggerEvent('like', {
        articleId: article.id,
        isLiked: newLikeStatus,
        likeCount
      })
    },

    onTapComment(e) {
      e.stopPropagation()
      const article = this.properties.article
      wx.navigateTo({
        url: `/pages/article/article?id=${article.id}&focusComment=true`
      })
    },

    onTapShare(e) {
      e.stopPropagation()
      this.triggerEvent('share', this.properties.article)
    }
  }
})
