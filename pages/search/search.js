const app = getApp()
const mock = require('../../data/mock.js')
const util = require('../../utils/util.js')
const config = require('../../utils/config.js')

Page({
  data: {
    articles: [],
    hotUsers: [],
    categories: config.CATEGORIES,
    selectedCategory: 0,
    keyword: '',
    loading: true,
    page: 1,
    pageSize: 10,
    hasMore: true
  },

  onLoad: function () {
    this.loadData()
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  loadData: function () {
    this.setData({ loading: true })
    
    setTimeout(() => {
      const articles = mock.getArticles({ page: 1, pageSize: this.data.pageSize })
      const users = mock.getUsers({ page: 1, pageSize: 4 })
      
      this.setData({
        articles: articles.list,
        hotUsers: users.list,
        loading: false,
        hasMore: articles.list.length >= this.data.pageSize,
        page: 2
      })
    }, 300)
  },

  onKeywordInput: function (e) {
    this.setData({
      keyword: e.detail.value
    })
  },

  onSearch: function () {
    if (!this.data.keyword.trim()) {
      util.showToast('请输入搜索关键词', 'none')
      return
    }
    
    this.setData({
      page: 1,
      articles: [],
      loading: true
    })
    
    setTimeout(() => {
      const result = mock.getArticles({
        page: 1,
        pageSize: this.data.pageSize,
        keyword: this.data.keyword
      })
      
      this.setData({
        articles: result.list,
        loading: false,
        hasMore: result.list.length >= this.data.pageSize,
        page: 2
      })
    }, 300)
  },

  selectCategory: function (e) {
    const categoryId = e.currentTarget.dataset.id
    this.setData({
      selectedCategory: categoryId,
      page: 1,
      articles: [],
      loading: true
    })
    
    setTimeout(() => {
      const options = {
        page: 1,
        pageSize: this.data.pageSize
      }
      
      if (categoryId > 0) {
        options.categoryId = categoryId
      }
      
      const result = mock.getArticles(options)
      
      this.setData({
        articles: result.list,
        loading: false,
        hasMore: result.list.length >= this.data.pageSize,
        page: 2
      })
    }, 300)
  },

  onTapArticle: function (e) {
    const article = e.currentTarget.dataset.article
    wx.navigateTo({
      url: `/pages/article/article?id=${article.id}`
    })
  },

  onTapUser: function (e) {
    const userId = e.currentTarget.dataset.userId
    wx.navigateTo({
      url: `/pages/profile/profile?userId=${userId}`
    })
  },

  onScrollLower: function () {
    if (this.data.hasMore && !this.data.loading) {
      this.loadMore()
    }
  },

  loadMore: function () {
    this.setData({ loading: true })
    
    setTimeout(() => {
      const options = {
        page: this.data.page,
        pageSize: this.data.pageSize
      }
      
      if (this.data.selectedCategory > 0) {
        options.categoryId = this.data.selectedCategory
      }
      
      if (this.data.keyword) {
        options.keyword = this.data.keyword
      }
      
      const result = mock.getArticles(options)
      
      this.setData({
        articles: [...this.data.articles, ...result.list],
        loading: false,
        hasMore: result.list.length >= this.data.pageSize,
        page: this.data.page + 1
      })
    }, 300)
  }
})
