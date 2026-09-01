const {
  getPackageFull,
  getModelsByCategory,
  getModelsByCategoryAndBrand,
  getModelById
} = require('../../data/packages.js')
const { formatMoney } = require('../../utils/format.js')

const app = getApp()

Page({
  data: {
    packageName: '',
    packageId: '',
    categories: [],
    baseMats: [],
    catTotal: 0,
    activeCategoryId: '',
    brandChips: [],
    activeBrandId: 'all',
    models: [],
    catTip: '',
    showPlanBar: false,
    planCount: 0,
    planExtraPlain: 0,
    planExtraText: ''
  },

  onLoad(query) {
    const packageId = query.packageId || app.globalData.currentPackageId
    app.globalData.currentPackageId = packageId

    const full = getPackageFull(packageId)
    if (!full) {
      wx.showToast({ title: '套餐不存在', icon: 'none' })
      return
    }

    const categories = (full.categories || []).map((c) => ({
      id: c.id,
      name: c.name,
      icon: c.icon,
      count: getModelsByCategory(c.id).length
    }))

    let activeCategoryId = (categories[0] && categories[0].id) || ''
    if (query.categoryId && categories.some((c) => c.id === query.categoryId)) {
      activeCategoryId = query.categoryId
    }

    this.setData({
      packageName: full.name,
      packageId,
      categories,
      catTotal: categories.length,
      activeCategoryId
    })
    this.buildBaseMats()
    this.refreshBrands()
    this.updatePlanBar()
  },

  buildBaseMats() {
    const full = getPackageFull(this.data.packageId)
    if (!full || !full.materials) return
    const saved = app.globalData.baseSelections || {}
    const baseMats = full.materials.map((mat) => {
      const opts = mat.options && mat.options.length ? mat.options : (mat.value ? [mat.value] : [])
      let chosen = saved[mat.label]
      if (opts.indexOf(chosen) === -1) chosen = opts[0] || ''
      return {
        label: mat.label,
        hint: mat.prefix || '',
        options: opts.map((name) => ({ name, selected: name === chosen }))
      }
    })
    this.setData({ baseMats })
  },

  onBaseTap(e) {
    const label = e.currentTarget.dataset.label
    const name = e.currentTarget.dataset.name
    const base = Object.assign({}, app.globalData.baseSelections || {})
    base[label] = name
    app.globalData.baseSelections = base
    this.buildBaseMats()
    wx.showToast({ title: '已选' + label + '：' + name, icon: 'none' })
  },

  onShow() {
    this.refreshModels()
    this.updatePlanBar()
  },

  onCategoryTap(e) {
    this.setData({ activeCategoryId: e.currentTarget.dataset.id })
    this.refreshBrands()
  },

  onBrandTap(e) {
    this.setData({ activeBrandId: e.currentTarget.dataset.id })
    this.refreshModels()
  },

  refreshBrands() {
    const full = getPackageFull(this.data.packageId)
    const target = (full.categories || []).find((c) => c.id === this.data.activeCategoryId)
    const brands = (target && target.brands) || []
    const brandChips = [{ id: 'all', name: '全部' }].concat(
      brands.map((b) => ({ id: b.id, name: b.name }))
    )
    this.setData({ brandChips, activeBrandId: 'all' })
    this.refreshModels()
  },

  refreshModels() {
    const { activeCategoryId, activeBrandId } = this.data
    const list =
      activeBrandId === 'all'
        ? getModelsByCategory(activeCategoryId)
        : getModelsByCategoryAndBrand(activeCategoryId, activeBrandId)
    const selections = app.globalData.selections || {}

    // 分类提示：几款套餐标配 + 几款升级
    const catModels = getModelsByCategory(activeCategoryId)
    const stdCount = catModels.filter((m) => m.type === 'standard').length
    const upCount = catModels.length - stdCount

    const models = list.map((m) => this.enrichModel(m, selections[m.categoryId] === m.id))
    this.setData({
      models,
      catTip:
        stdCount > 0
          ? '套餐内含 ' + stdCount + ' 款标配（可任选） · 另有 ' + upCount + ' 款升级可选'
          : ''
    })
  },

  enrichModel(m, isSelected) {
    const isStandard = m.type === 'standard'
    return {
      id: m.id,
      name: m.name,
      emoji: m.emoji,
      isStandard,
      selected: isSelected,
      rowClass: isSelected ? 'model-row card selected' : 'model-row card',
      tagText: isStandard ? '套餐标配' : '升级 +¥' + formatMoney(m.extraPrice),
      tagClass: isStandard ? 'tag tag-standard' : 'tag tag-upgrade',
      desc: m.desc,
      priceClass: isStandard ? 'model-price price-free' : 'model-price price',
      priceText: isStandard ? '已含套餐价' : '套餐价 +¥' + formatMoney(m.extraPrice)
    }
  },

  quickSelect(e) {
    const id = e.currentTarget.dataset.id
    const model = getModelById(id)
    if (!model) return
    const selections = app.globalData.selections || {}
    if (selections[model.categoryId] === id) {
      delete selections[model.categoryId]
      wx.showToast({ title: '已取消，恢复默认标配', icon: 'none' })
    } else {
      selections[model.categoryId] = id
      wx.showToast({ title: '已加入方案', icon: 'success' })
    }
    app.globalData.selections = selections
    this.refreshModels()
    this.updatePlanBar()
    app.updatePlanBadge()
  },

  updatePlanBar() {
    const full = getPackageFull(this.data.packageId)
    if (!full || !full.categories) return
    const selections = app.globalData.selections || {}
    let count = 0
    let extra = 0
    full.categories.forEach((cat) => {
      const modelId = selections[cat.id]
      if (!modelId) return
      const m = getModelById(modelId)
      if (!m) return
      count += 1
      if (m.type === 'upgrade') extra += m.extraPrice
    })
    this.setData({
      showPlanBar: count > 0,
      planCount: count,
      planExtraPlain: extra,
      planExtraText: extra > 0 ? formatMoney(extra) : ''
    })
  },

  goPlanBar() {
    wx.switchTab({ url: '/pages/plan/plan' })
  },

  goDetail(e) {
    wx.navigateTo({
      url: '/pages/model-detail/model-detail?modelId=' + e.currentTarget.dataset.id
    })
  },

  onShareAppMessage() {
    return {
      title: this.data.packageName + ' · 装修材质随心选，点进来看',
      path: '/pages/materials/materials?packageId=' + this.data.packageId
    }
  }
})
