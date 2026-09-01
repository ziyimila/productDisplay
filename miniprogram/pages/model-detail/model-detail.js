const { getModelById, getBrandById } = require('../../data/packages.js')
const { formatMoney } = require('../../utils/format.js')

const app = getApp()

Page({
  data: {
    model: null,
    specs: [],
    brandName: '',
    categoryId: '',
    selected: false,
    showImage: true,
    thumbIndex: 0,
    thumbs: [],
    currentSrc: '',
    currentEmoji: '',
    capText: ''
  },

  onLoad(query) {
    const m = getModelById(query.modelId)
    if (!m) {
      wx.showToast({ title: '型号不存在', icon: 'none' })
      return
    }
    const brand = getBrandById(m.brandId)
    const isStandard = m.type === 'standard'
    const selected = !!(app.globalData.selections && app.globalData.selections[m.categoryId] === m.id)
    const images = m.images && m.images.length > 0 ? m.images : []

    const thumbs = images.length > 0
      ? images.map((src, i) => ({ src, text: '图' + (i + 1) }))
      : [
          { emoji: m.emoji, text: '主图' },
          { emoji: '📐', text: '尺寸' },
          { emoji: '🔍', text: '细节' }
        ]

    this.setData({
      model: {
        id: m.id,
        name: m.name,
        emoji: m.emoji,
        tagText: isStandard ? '套餐标配' : '升级 +¥' + formatMoney(m.extraPrice),
        tagClass: isStandard ? 'tag tag-standard' : 'tag tag-upgrade',
        priceText: isStandard ? '已含套餐价' : '+¥' + formatMoney(m.extraPrice),
        priceTip: isStandard ? '' : '在套餐基础上补差价',
        desc: m.desc
      },
      specs: m.specs,
      brandName: brand ? brand.name : '',
      categoryId: m.categoryId,
      selected,
      showImage: images.length === 0,
      thumbIndex: 0,
      thumbs,
      currentSrc: images.length > 0 ? images[0] : '',
      currentEmoji: thumbs[0].emoji || '',
      capText: images.length > 0 ? '' : '实物图占位 1/3 · 请替换为实拍图'
    })

    wx.setNavigationBarTitle({ title: m.name })
  },

  onThumbTap(e) {
    const index = Number(e.currentTarget.dataset.index)
    const thumb = this.data.thumbs[index]
    this.setData({
      thumbIndex: index,
      currentSrc: thumb.src || '',
      currentEmoji: thumb.emoji || this.data.model.emoji,
      capText: this.data.showImage
        ? '实物图占位 ' + (index + 1) + '/' + this.data.thumbs.length + ' · 请替换为实拍图'
        : ''
    })
  },

  choose() {
    if (this.data.selected) {
      wx.showToast({ title: '该型号已在方案中', icon: 'none' })
      return
    }
    app.globalData.selections[this.data.categoryId] = this.data.model.id
    this.setData({ selected: true })
    app.updatePlanBadge()
    wx.showToast({ title: '已加入方案', icon: 'success' })
    setTimeout(() => {
      wx.navigateBack()
    }, 700)
  },

  goPlan() {
    wx.switchTab({ url: '/pages/plan/plan' })
  },

  onShareAppMessage() {
    return {
      title: (this.data.brandName ? this.data.brandName + ' · ' : '') + this.data.model.name,
      path: '/pages/model-detail/model-detail?modelId=' + this.data.model.id
    }
  }
})
