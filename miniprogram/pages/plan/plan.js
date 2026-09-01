const {
  getPackageFull,
  getStandardModels,
  getModelById,
  getBrandById,
  RULES
} = require('../../data/packages.js')
const { buildQuote, ROOM_LABEL, ROOM_EXTRA_KEYS } = require('../../utils/quote.js')
const { formatMoney } = require('../../utils/format.js')

const ROOM_KEYS = ['bedroom', 'kitchen', 'bathroom', 'dining', 'living']
// 卧室/卫生间可加；厨房/餐厅/客厅超出按面积核算、不单独加，固定为标配数量不允许加
const FIXED_ROOMS = ['kitchen', 'dining', 'living']
const STD_TEXT =
  RULES.stdArea + '㎡·' + RULES.stdRoom.bedroom + '房' + RULES.stdRoom.kitchen + '厨' +
  RULES.stdRoom.bathroom + '卫' + RULES.stdRoom.dining + '餐' + RULES.stdRoom.living + '厅'

const app = getApp()

Page({
  data: {
    packageId: '',
    packageName: '',
    stdText: STD_TEXT,
    layout: null,
    roomList: [],
    lines: [],
    baseLines: [],
    feeRows: [],
    totalText: '¥0'
  },

  onLoad() {
    this.setData({ layout: Object.assign({}, app.globalData.layout) })
  },

  onShow() {
    try {
      wx.removeTabBarBadge({ index: 1, complete: function () {} })
    } catch (e) {}
    this.rebuild()
  },

  rebuild() {
    const pid = app.globalData.currentPackageId
    const full = getPackageFull(pid)
    if (!full) return

    const layout = Object.assign({}, this.data.layout)
    const quote = buildQuote(pid, layout, app.globalData.selections)
    if (!quote) return

    // 已选材质清单行
    const selections = app.globalData.selections || {}
    const lines = (full.categories || []).map((cat) => {
      const stdCount = getStandardModels(cat.id).length
      const modelId = selections[cat.id]
      const model = modelId ? getModelById(modelId) : getStandardModels(cat.id)[0]
      const brand = getBrandById(model.brandId)
      const isUpgrade = model.type === 'upgrade'
      return {
        categoryId: cat.id,
        categoryName: cat.icon + ' ' + cat.name,
        modelName: (brand ? brand.name + ' · ' : '') + model.name,
        label: isUpgrade ? '升级' : '标配',
        labelClass: isUpgrade ? 'tag tag-upgrade' : 'tag tag-standard',
        priceText: isUpgrade ? '+' + formatMoney(model.extraPrice) : '标配',
        priceClass: isUpgrade ? 'p price' : 'p price-free',
        includeText: !isUpgrade && stdCount > 1 ? '套餐内含 ' + stdCount + ' 款可选' : ''
      }
    })

    // 基础材料（套餐标配，可不加价任选）——显示客户选中的选项
    const baseChoices = app.globalData.baseSelections || {}
    const baseLines = (full.materials || []).map((mat) => {
      const opts = mat.options && mat.options.length ? mat.options : (mat.value ? [mat.value] : [])
      let chosen = baseChoices[mat.label]
      if (opts.indexOf(chosen) === -1) chosen = opts[0] || ''
      return { label: mat.label, value: chosen }
    })

    // 费用明细行
    const feeRows = [{
      label: '基础套餐（' + STD_TEXT + '）',
      text: '¥' + formatMoney(quote.pkg.basePrice)
    }]
    if (quote.overArea > 0) {
      feeRows.push({
        label: '超出面积 ' + quote.overArea + '㎡ × ¥' + quote.pkg.perSqmRate + '/㎡',
        text: '+¥' + formatMoney(quote.areaExtra)
      })
    }
    quote.roomExtras.forEach((r) => {
      feeRows.push({
        label: '超出户型 · 多' + r.count + r.label + '（¥' + formatMoney(r.rate) + '/间）',
        text: '+¥' + formatMoney(r.amount)
      })
    })
    if (quote.upgradeExtra > 0) {
      feeRows.push({
        label: '材质升级合计',
        text: '+¥' + formatMoney(quote.upgradeExtra)
      })
    }

    // 户型步进器
    const roomList = ROOM_KEYS.map((key) => {
      const count = Number(layout[key]) || 0
      const std = RULES.stdRoom[key]
      const over = Math.max(0, count - std)
      const rate = (full.extraRates && full.extraRates[key]) || 0
      const chargeable = ROOM_EXTRA_KEYS.indexOf(key) !== -1
      return {
        key,
        label: ROOM_LABEL[key],
        count,
        std,
        over,
        adjustable: FIXED_ROOMS.indexOf(key) === -1,
        overText: over > 0
          ? (chargeable && rate > 0 ? '+' + formatMoney(over * rate) : '按面积核算')
          : ''
      }
    })

    this.setData({
      packageId: pid,
      packageName: full.name,
      layout,
      roomList,
      lines,
      baseLines,
      feeRows,
      totalText: '¥' + formatMoney(quote.total)
    })
  },

  onAreaInput(e) {
    const raw = String(e.detail.value || '').replace(/[^\d]/g, '').slice(0, 4)
    const layout = Object.assign({}, this.data.layout, { area: Number(raw) || 0 })
    app.globalData.layout = layout
    this.setData({ layout })
    this.rebuild()
  },

  changeRoom(e) {
    const key = e.currentTarget.dataset.key
    const delta = Number(e.currentTarget.dataset.delta)
    if (FIXED_ROOMS.indexOf(key) !== -1 && delta > 0) return // 厨房/餐厅/客厅不允许加
    const layout = Object.assign({}, this.data.layout)
    layout[key] = Math.max(0, Math.min(9, (Number(layout[key]) || 0) + delta))
    app.globalData.layout = layout
    this.setData({ layout })
    this.rebuild()
  },

  changePackage() {
    wx.switchTab({ url: '/pages/index/index' })
  },

  goMaterials() {
    wx.navigateTo({
      url: '/pages/materials/materials?packageId=' + this.data.packageId
    })
  },

  changeCategory(e) {
    const categoryId = e.currentTarget.dataset.category
    wx.navigateTo({
      url: '/pages/materials/materials?packageId=' + this.data.packageId + '&categoryId=' + categoryId
    })
  },

  sendPlan() {
    const d = this.data
    let text = '【' + d.packageName + '】方案报价\n'
    text += '房屋：' + (d.layout.area || 0) + '㎡ · ' +
      d.layout.bedroom + '房' + d.layout.kitchen + '厨' +
      d.layout.bathroom + '卫' + d.layout.dining + '餐' +
      d.layout.living + '厅\n'
    d.feeRows.forEach((r) => {
      text += r.label + '：' + r.text + '\n'
    })
    text += '预估总价：' + d.totalText + '\n'
    if (d.baseLines && d.baseLines.length) {
      text += '—— 基础材料（标配） ——\n'
      d.baseLines.forEach((l) => { text += l.label + '：' + l.value + '\n' })
    }
    text += '—— 材质清单 ——\n'
    d.lines.forEach((l) => {
      let line = l.categoryName + '：' + l.modelName
      if (l.includeText) line += '（' + l.includeText + '）'
      line += '（' + l.priceText + '）'
      text += line + '\n'
    })
    text += '（最终以实地量房为准）'
    wx.setClipboardData({
      data: text,
      success() {
        wx.showToast({ title: '方案已复制，可发给客户', icon: 'success' })
      }
    })
  },

  onShareAppMessage() {
    return {
      title: '我的方案：' + this.data.packageName + ' · 预估 ' + this.data.totalText,
      path: '/pages/index/index'
    }
  }
})
