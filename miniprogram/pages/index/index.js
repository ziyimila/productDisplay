const { PACKAGES, getPackageFull, RULES } = require('../../data/packages.js')
const { ROOM_LABEL, ROOM_EXTRA_KEYS } = require('../../utils/quote.js')
const { formatMoney } = require('../../utils/format.js')

Page({
  data: {
    cards: []
  },

  onLoad() {
    this.buildCards()
  },

  onShow() {
    this.buildCards()
  },

  buildCards() {
    const stdText =
      '覆盖 ' + RULES.stdArea + '㎡·' +
      RULES.stdRoom.bedroom + '房' + RULES.stdRoom.kitchen + '厨' +
      RULES.stdRoom.bathroom + '卫' + RULES.stdRoom.dining + '餐' +
      RULES.stdRoom.living + '厅'

    const cards = PACKAGES.map((pkg) => {
      const full = getPackageFull(pkg.id)
      const categoryNames = (full.categories || []).map((c) => c.name)
      const extraRates = pkg.extraRates || {}
      const roomParts = []
      ROOM_EXTRA_KEYS.forEach((key) => {
        const rate = extraRates[key]
        if (rate > 0) roomParts.push('多1' + (ROOM_LABEL[key] || key) + ' +¥' + formatMoney(rate))
      })
      const roomRateText = roomParts.length
        ? roomParts.join(' · ') + ' · 其他超出房间按面积核算'
        : '超出户型按面积核算'
      const brandNames = []
      ;(full.categories || []).forEach((cat) => {
        ;(cat.brands || []).forEach((b) => {
          if (brandNames.indexOf(b.name) === -1) brandNames.push(b.name)
        })
      })
      return {
        id: pkg.id,
        name: pkg.name,
        tag: pkg.tag,
        hot: pkg.hot,
        price: pkg.basePrice,
        rateText: '超' + RULES.stdArea + '㎡按 ¥' + pkg.perSqmRate + '/㎡ 核算',
        roomRateText,
        stdText,
        materials: pkg.materials || [],
        categoryChips: categoryNames.slice(0, 6).map((n) => ({ name: n })),
        brandLine: brandNames.slice(0, 4).join(' · ')
      }
    })
    this.setData({ cards })
  },

  goMaterials(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/materials/materials?packageId=' + id
    })
  },

  onShareAppMessage() {
    return {
      title: '装修套餐 · 一口价，材质可换',
      path: '/pages/index/index'
    }
  }
})
