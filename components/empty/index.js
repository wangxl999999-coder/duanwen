Component({
  properties: {
    icon: {
      type: String,
      value: '📝'
    },
    text: {
      type: String,
      value: '暂无数据'
    },
    subText: {
      type: String,
      value: ''
    },
    showButton: {
      type: Boolean,
      value: false
    },
    buttonText: {
      type: String,
      value: '去发布'
    }
  },

  methods: {
    onButtonTap() {
      this.triggerEvent('buttonTap')
    }
  }
})
