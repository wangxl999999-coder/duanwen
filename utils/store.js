const store = {
  set: function (key, value) {
    try {
      wx.setStorageSync(key, JSON.stringify(value))
      return true
    } catch (e) {
      console.error('Storage set error:', e)
      return false
    }
  },

  get: function (key, defaultValue = null) {
    try {
      const value = wx.getStorageSync(key)
      if (value) {
        return JSON.parse(value)
      }
      return defaultValue
    } catch (e) {
      console.error('Storage get error:', e)
      return defaultValue
    }
  },

  remove: function (key) {
    try {
      wx.removeStorageSync(key)
      return true
    } catch (e) {
      console.error('Storage remove error:', e)
      return false
    }
  },

  clear: function () {
    try {
      wx.clearStorageSync()
      return true
    } catch (e) {
      console.error('Storage clear error:', e)
      return false
    }
  }
}

module.exports = store
