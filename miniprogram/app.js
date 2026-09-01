const { PACKAGES } = require('./data/packages.js')

App({
  globalData: {
    currentPackageId: PACKAGES[0].id,
    // 客户房屋信息：面积 + 户型（套餐覆盖标准：90㎡·2房1厨1卫1餐1厅）
    layout: {
      area: 90,
      bedroom: 2,
      kitchen: 1,
      bathroom: 1,
      dining: 1,
      living: 1
    },
    selections: {}, // categoryId -> modelId
    baseSelections: {} // 基础材料选项：材料名(如 水管) -> 选中的品牌/款（套餐标配，不加价）
  },

  // 方案清单 tab 角标：显示已选品类数
  updatePlanBadge() {
    const count = Object.keys(this.globalData.selections || {}).length
    const opt = { index: 1, complete: function () {} }
    try {
      if (count > 0) {
        opt.text = String(count)
        wx.setTabBarBadge(opt)
      } else {
        wx.removeTabBarBadge(opt)
      }
    } catch (e) {
      // 少数环境不支持角标，忽略即可
    }
  },

  onLaunch() {}
})
