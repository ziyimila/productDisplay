const app = getApp()

Page({
  data: {
    companyName: 'XX 整装装饰',
    phone: '138-0000-0000',
    wechat: 'zszx_demo',
    address: '待填写（示例：XX市XX区XX路XX号）'
  },

  makeCall() {
    wx.makePhoneCall({
      phoneNumber: '13800000000',
      fail() {
        wx.showToast({ title: '请先填写真实电话', icon: 'none' })
      }
    })
  },

  copyWechat() {
    wx.setClipboardData({
      data: this.data.wechat,
      success() {
        wx.showToast({ title: '微信号已复制', icon: 'success' })
      }
    })
  },

  onShareAppMessage() {
    return {
      title: '装修套餐 · 明码标价，材质可换',
      path: '/pages/index/index'
    }
  }
})
