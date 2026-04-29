const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    mode: 'login',
    phone: '',
    code: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    agreeTerms: false,
    codeText: '获取验证码',
    codeCountdown: 0,
    submitting: false,
    passwordVisible: false,
    confirmPasswordVisible: false
  },

  onLoad: function (options) {
    const mode = options.mode || 'login'
    this.setData({ mode })
  },

  switchMode: function (e) {
    const mode = e.currentTarget.dataset.mode
    this.setData({
      mode,
      phone: '',
      code: '',
      password: '',
      confirmPassword: '',
      nickname: ''
    })
  },

  onPhoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  onCodeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },

  onPasswordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  onConfirmPasswordInput: function (e) {
    this.setData({
      confirmPassword: e.detail.value
    })
  },

  onNicknameInput: function (e) {
    this.setData({
      nickname: e.detail.value
    })
  },

  toggleTerms: function () {
    this.setData({
      agreeTerms: !this.data.agreeTerms
    })
  },

  togglePasswordVisible: function () {
    this.setData({
      passwordVisible: !this.data.passwordVisible
    })
  },

  toggleConfirmPasswordVisible: function () {
    this.setData({
      confirmPasswordVisible: !this.data.confirmPasswordVisible
    })
  },

  sendCode: function () {
    const phone = this.data.phone.trim()
    
    if (!phone) {
      util.showToast('请输入手机号', 'none')
      return
    }
    
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      util.showToast('请输入正确的手机号', 'none')
      return
    }
    
    if (this.data.codeCountdown > 0) {
      return
    }
    
    util.showToast('验证码已发送', 'success')
    
    let countdown = 60
    this.setData({
      codeCountdown: countdown,
      codeText: `${countdown}s`
    })
    
    const timer = setInterval(() => {
      countdown--
      if (countdown <= 0) {
        clearInterval(timer)
        this.setData({
          codeCountdown: 0,
          codeText: '获取验证码'
        })
      } else {
        this.setData({
          codeText: `${countdown}s`
        })
      }
    }, 1000)
  },

  submitLogin: function () {
    const { phone, password, code, mode, agreeTerms } = this.data
    
    if (mode === 'login') {
      if (!phone.trim()) {
        util.showToast('请输入手机号', 'none')
        return
      }
      
      if (!/^1[3-9]\d{9}$/.test(phone.trim())) {
        util.showToast('请输入正确的手机号', 'none')
        return
      }
      
      if (!password.trim()) {
        util.showToast('请输入密码', 'none')
        return
      }
      
      if (password.trim().length < 6) {
        util.showToast('密码至少6位', 'none')
        return
      }
    } else {
      if (!phone.trim()) {
        util.showToast('请输入手机号', 'none')
        return
      }
      
      if (!/^1[3-9]\d{9}$/.test(phone.trim())) {
        util.showToast('请输入正确的手机号', 'none')
        return
      }
      
      if (!code.trim()) {
        util.showToast('请输入验证码', 'none')
        return
      }
      
      if (!this.data.nickname.trim()) {
        util.showToast('请输入昵称', 'none')
        return
      }
      
      if (!password.trim()) {
        util.showToast('请输入密码', 'none')
        return
      }
      
      if (password.trim().length < 6) {
        util.showToast('密码至少6位', 'none')
        return
      }
      
      if (password !== confirmPassword) {
        util.showToast('两次密码不一致', 'none')
        return
      }
      
      if (!agreeTerms) {
        util.showToast('请先同意用户协议', 'none')
        return
      }
    }
    
    this.setData({ submitting: true })
    util.showLoading(mode === 'login' ? '登录中...' : '注册中...')
    
    setTimeout(() => {
      const userInfo = {
        id: 'user_' + Date.now().toString().slice(-6),
        avatar: '/assets/images/avatar1.jpg',
        nickname: this.data.nickname || '用户' + phone.slice(-4),
        username: 'user_' + phone.slice(-4),
        fansCount: 0,
        followCount: 0,
        likesCount: 0,
        bio: '',
        region: '',
        age: 0,
        gender: 0,
        phone: phone
      }
      
      const token = 'token_' + Date.now()
      
      app.login(userInfo, token)
      
      util.hideLoading()
      util.showToast(mode === 'login' ? '登录成功' : '注册成功', 'success')
      
      this.setData({ submitting: false })
      
      setTimeout(() => {
        wx.navigateBack()
      }, 1000)
    }, 1500)
  },

  wxLogin: function () {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        const userInfo = {
          id: 'user_wx_' + Date.now(),
          avatar: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName,
          username: 'wx_user_' + Date.now().toString().slice(-6),
          fansCount: 0,
          followCount: 0,
          likesCount: 0,
          bio: '',
          region: res.userInfo.province + ' ' + res.userInfo.city,
          age: 0,
          gender: res.userInfo.gender
        }
        
        const token = 'token_wx_' + Date.now()
        
        app.login(userInfo, token)
        
        util.showToast('登录成功', 'success')
        
        setTimeout(() => {
          wx.navigateBack()
        }, 1000)
      },
      fail: (err) => {
        console.log('微信授权失败:', err)
        util.showToast('授权失败，请重试', 'none')
      }
    })
  },

  goBack: function () {
    wx.navigateBack()
  },

  openTerms: function () {
    util.showToast('用户协议开发中...', 'none')
  },

  openPrivacy: function () {
    util.showToast('隐私政策开发中...', 'none')
  }
})
