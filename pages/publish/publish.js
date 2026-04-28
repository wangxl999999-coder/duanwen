const app = getApp()
const mock = require('../../data/mock.js')
const util = require('../../utils/util.js')
const config = require('../../utils/config.js')

Page({
  data: {
    title: '',
    content: '',
    images: [],
    selectedCategory: null,
    categories: config.CATEGORIES,
    selectedMusic: null,
    musicList: config.MUSIC_LIST,
    isPublic: true,
    showCategoryPanel: false,
    showMusicPanel: false,
    isPlaying: false,
    playingMusicId: null,
    submitting: false
  },

  onLoad: function () {
    this.checkLogin()
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },

  onUnload: function () {
    app.stopBackgroundMusic()
  },

  checkLogin: function () {
    const appInstance = getApp()
    if (!appInstance.globalData.isLoggedIn) {
      wx.showModal({
        title: '请先登录',
        content: '发布文章需要登录账号',
        confirmText: '去登录',
        showCancel: false,
        success: () => {
          wx.switchTab({
            url: '/pages/profile/profile'
          })
        }
      })
    }
  },

  onTitleInput: function (e) {
    this.setData({
      title: e.detail.value
    })
  },

  onContentInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  chooseImages: function () {
    const maxCount = 9 - this.data.images.length
    if (maxCount <= 0) {
      util.showToast('最多只能上传9张图片', 'none')
      return
    }
    
    wx.chooseMedia({
      count: maxCount,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const newImages = res.tempFiles.map(file => file.tempFilePath)
        this.setData({
          images: [...this.data.images, ...newImages]
        })
      }
    })
  },

  previewImage: function (e) {
    const index = e.currentTarget.dataset.index
    wx.previewImage({
      current: this.data.images[index],
      urls: this.data.images
    })
  },

  deleteImage: function (e) {
    const index = e.currentTarget.dataset.index
    const images = this.data.images.filter((_, i) => i !== index)
    this.setData({ images })
  },

  toggleCategoryPanel: function () {
    this.setData({
      showCategoryPanel: !this.data.showCategoryPanel,
      showMusicPanel: false
    })
  },

  selectCategory: function (e) {
    const category = e.currentTarget.dataset.category
    this.setData({
      selectedCategory: category,
      showCategoryPanel: false
    })
  },

  toggleMusicPanel: function () {
    this.setData({
      showMusicPanel: !this.data.showMusicPanel,
      showCategoryPanel: false
    })
  },

  selectMusic: function (e) {
    const music = e.currentTarget.dataset.music
    this.setData({
      selectedMusic: music,
      showMusicPanel: false
    })
  },

  toggleMusicPlay: function (e) {
    const music = e.currentTarget.dataset.music
    
    if (this.data.isPlaying && this.data.playingMusicId === music.id) {
      app.pauseBackgroundMusic()
      this.setData({
        isPlaying: false,
        playingMusicId: null
      })
    } else {
      app.playBackgroundMusic(music.url, music.name)
      this.setData({
        isPlaying: true,
        playingMusicId: music.id
      })
    }
  },

  togglePublic: function () {
    this.setData({
      isPublic: !this.data.isPublic
    })
  },

  submitArticle: function () {
    const appInstance = getApp()
    if (!appInstance.globalData.isLoggedIn) {
      appInstance.showLoginModal()
      return
    }
    
    const { title, content, selectedCategory } = this.data
    
    if (!title.trim()) {
      util.showToast('请输入文章标题', 'none')
      return
    }
    
    if (title.trim().length < 2) {
      util.showToast('标题至少2个字', 'none')
      return
    }
    
    if (!content.trim()) {
      util.showToast('请输入文章内容', 'none')
      return
    }
    
    if (content.trim().length < 10) {
      util.showToast('内容至少10个字', 'none')
      return
    }
    
    if (!selectedCategory) {
      util.showToast('请选择文章分类', 'none')
      return
    }
    
    this.setData({ submitting: true })
    util.showLoading('发布中...')
    
    setTimeout(() => {
      const userInfo = appInstance.globalData.userInfo || {
        id: 'user_001',
        avatar: '/assets/images/avatar1.jpg',
        nickname: '用户'
      }
      
      mock.createArticle({
        userId: userInfo.id,
        author: {
          id: userInfo.id,
          avatar: userInfo.avatar,
          nickname: userInfo.nickname
        },
        title: title.trim(),
        content: content.trim(),
        images: this.data.images,
        categoryId: this.data.selectedCategory.id,
        categoryName: this.data.selectedCategory.name,
        musicId: this.data.selectedMusic ? this.data.selectedMusic.id : null,
        musicName: this.data.selectedMusic ? this.data.selectedMusic.name : null,
        musicUrl: this.data.selectedMusic ? this.data.selectedMusic.url : null,
        isPublic: this.data.isPublic
      })
      
      util.hideLoading()
      util.showToast('发布成功', 'success')
      
      this.setData({
        title: '',
        content: '',
        images: [],
        selectedCategory: null,
        selectedMusic: null,
        isPublic: true,
        submitting: false
      })
      
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/index/index'
        })
      }, 1000)
    }, 1500)
  },

  hidePanels: function () {
    this.setData({
      showCategoryPanel: false,
      showMusicPanel: false
    })
  },

  goBack: function () {
    wx.navigateBack()
  }
})
