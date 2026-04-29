const app = getApp()
const mock = require('../../data/mock.js')
const util = require('../../utils/util.js')

Page({
  data: {
    articleId: '',
    article: null,
    comments: [],
    commentPage: 1,
    commentPageSize: 10,
    hasMoreComments: true,
    loading: true,
    commentLoading: false,
    isLiked: false,
    isCollected: false,
    isFollowed: false,
    likeCount: 0,
    collectCount: 0,
    commentCount: 0,
    isPlaying: false,
    showCommentInput: false,
    commentContent: '',
    focusComment: false,
    replyTo: null
  },

  onLoad: function (options) {
    const articleId = options.id || ''
    const focusComment = options.focusComment === 'true'
    
    this.setData({
      articleId,
      focusComment
    })
    
    this.loadArticle(articleId)
    
    if (focusComment) {
      this.setData({ showCommentInput: true })
    }
  },

  onShow: function () {
    app.pauseBackgroundMusic()
  },

  onUnload: function () {
    app.stopBackgroundMusic()
  },

  loadArticle: function (articleId) {
    this.setData({ loading: true })
    
    setTimeout(() => {
      const article = mock.getArticleById(articleId)
      
      if (article) {
        this.setData({
          article,
          loading: false,
          likeCount: article.likeCount,
          collectCount: article.collectCount,
          commentCount: article.commentCount
        })
        
        this.loadComments()
      } else {
        this.setData({ loading: false })
        util.showToast('文章不存在', 'none')
      }
    }, 300)
  },

  loadComments: function () {
    if (!this.data.hasMoreComments) return
    
    this.setData({ commentLoading: true })
    
    setTimeout(() => {
      const result = mock.getComments(this.data.articleId, {
        page: this.data.commentPage,
        pageSize: this.data.commentPageSize
      })
      
      const newComments = this.data.commentPage === 1 
        ? result.list 
        : [...this.data.comments, ...result.list]
      
      this.setData({
        comments: newComments,
        commentLoading: false,
        hasMoreComments: result.list.length >= this.data.commentPageSize,
        commentPage: this.data.commentPage + 1
      })
    }, 300)
  },

  toggleMusic: function () {
    const article = this.data.article
    if (!article || !article.musicUrl) {
      util.showToast('暂无背景音乐', 'none')
      return
    }
    
    if (this.data.isPlaying) {
      app.pauseBackgroundMusic()
    } else {
      app.playBackgroundMusic(article.musicUrl, article.musicName)
    }
    
    this.setData({ isPlaying: !this.data.isPlaying })
  },

  onTapLike: function () {
    const appInstance = getApp()
    if (!appInstance.globalData.isLoggedIn) {
      appInstance.showLoginModal()
      return
    }
    
    const isLiked = this.data.isLiked
    const newLikeCount = this.data.likeCount + (isLiked ? -1 : 1)
    
    this.setData({
      isLiked: !isLiked,
      likeCount: newLikeCount
    })
    
    util.showToast(isLiked ? '已取消点赞' : '点赞成功', 'success')
  },

  onTapCollect: function () {
    const appInstance = getApp()
    if (!appInstance.globalData.isLoggedIn) {
      appInstance.showLoginModal()
      return
    }
    
    const isCollected = this.data.isCollected
    const newCollectCount = this.data.collectCount + (isCollected ? -1 : 1)
    
    this.setData({
      isCollected: !isCollected,
      collectCount: newCollectCount
    })
    
    util.showToast(isCollected ? '已取消收藏' : '收藏成功', 'success')
  },

  onTapFollow: function () {
    const appInstance = getApp()
    if (!appInstance.globalData.isLoggedIn) {
      appInstance.showLoginModal()
      return
    }
    
    const isFollowed = this.data.isFollowed
    
    this.setData({
      isFollowed: !isFollowed
    })
    
    util.showToast(isFollowed ? '已取消关注' : '关注成功', 'success')
  },

  onTapComment: function () {
    const appInstance = getApp()
    if (!appInstance.globalData.isLoggedIn) {
      appInstance.showLoginModal()
      return
    }
    
    this.setData({
      showCommentInput: true,
      replyTo: null,
      commentContent: ''
    })
  },

  onCommentInput: function (e) {
    this.setData({
      commentContent: e.detail.value
    })
  },

  submitComment: function () {
    const appInstance = getApp()
    if (!appInstance.globalData.isLoggedIn) {
      appInstance.showLoginModal()
      return
    }
    
    const content = this.data.commentContent.trim()
    if (!content) {
      util.showToast('请输入评论内容', 'none')
      return
    }
    
    const userInfo = appInstance.globalData.userInfo || {
      id: 'temp_user',
      avatar: '/assets/images/avatar1.jpg',
      nickname: '游客'
    }
    
    const newComment = mock.createComment({
      articleId: this.data.articleId,
      userId: userInfo.id,
      user: userInfo,
      content: content
    })
    
    this.setData({
      comments: [newComment, ...this.data.comments],
      commentCount: this.data.commentCount + 1,
      commentContent: '',
      showCommentInput: false,
      replyTo: null
    })
    
    util.showToast('评论成功', 'success')
  },

  onCommentLike: function (e) {
    const appInstance = getApp()
    if (!appInstance.globalData.isLoggedIn) {
      appInstance.showLoginModal()
      return
    }
    
    const { commentId, isLiked } = e.detail
    const comments = this.data.comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !isLiked,
          likeCount: comment.likeCount + (!isLiked ? 1 : -1)
        }
      }
      return comment
    })
    
    this.setData({ comments })
  },

  onCommentReply: function (e) {
    const appInstance = getApp()
    if (!appInstance.globalData.isLoggedIn) {
      appInstance.showLoginModal()
      return
    }
    
    const { replyTo } = e.detail
    this.setData({
      showCommentInput: true,
      replyTo: replyTo,
      commentContent: ''
    })
  },

  onTapAuthor: function () {
    const article = this.data.article
    if (!article) return
    
    wx.navigateTo({
      url: `/pages/profile/profile?userId=${article.author.id}`
    })
  },

  onTapShare: function () {
    wx.showActionSheet({
      itemList: ['分享到微信好友', '生成海报', '复制链接'],
      success: (res) => {
        util.showToast('分享功能开发中...', 'none')
      }
    })
  },

  hideCommentInput: function () {
    this.setData({
      showCommentInput: false,
      commentContent: '',
      replyTo: null
    })
  },

  onScrollLower: function () {
    this.loadComments()
  },

  goBack: function () {
    const pages = getCurrentPages()
    if (pages.length > 1) {
      wx.navigateBack({
        fail: () => {
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      })
    } else {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  },

  onShareAppMessage: function () {
    const article = this.data.article
    if (article) {
      return {
        title: article.title,
        path: `/pages/article/article?id=${article.id}`,
        imageUrl: article.images[0] || ''
      }
    }
  }
})
