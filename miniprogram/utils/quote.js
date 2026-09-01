const { getPackageById, getModelById, RULES } = require('../data/packages.js')

const ROOM_LABEL = {
  bedroom: '卧室',
  kitchen: '厨房',
  bathroom: '卫生间',
  dining: '餐厅',
  living: '客厅'
}

// 超出户型中，只有卫生间按「间」单独计价；其他超出房间（多卧室/多厨等）按面积核算，不单独加价
const ROOM_EXTRA_KEYS = ['bathroom']

// 根据套餐 + 户型/面积 + 已选材质，计算完整报价
// layout: { area, bedroom, kitchen, bathroom, dining, living }
function buildQuote(packageId, layout, selections) {
  const pkg = getPackageById(packageId)
  if (!pkg) return null
  const l = layout || {}

  const area = Number(l.area) || 0
  const overArea = Math.max(0, area - RULES.stdArea)
  const areaExtra = overArea * pkg.perSqmRate

  const roomExtras = []
  ROOM_EXTRA_KEYS.forEach((key) => {
    const count = Math.max(0, (Number(l[key]) || 0) - RULES.stdRoom[key])
    if (count > 0) {
      const rate = (pkg.extraRates && pkg.extraRates[key]) || 0
      roomExtras.push({
        key,
        label: ROOM_LABEL[key] || key,
        count,
        rate,
        amount: count * rate
      })
    }
  })

  let upgradeExtra = 0
  Object.keys(selections || {}).forEach((categoryId) => {
    const m = getModelById(selections[categoryId])
    if (m && m.type === 'upgrade') upgradeExtra += m.extraPrice
  })

  const roomExtraTotal = roomExtras.reduce((sum, r) => sum + r.amount, 0)
  const total = pkg.basePrice + areaExtra + roomExtraTotal + upgradeExtra

  return {
    pkg,
    area,
    overArea,
    areaExtra,
    roomExtras,
    roomExtraTotal,
    upgradeExtra,
    total
  }
}

module.exports = { buildQuote, ROOM_LABEL, ROOM_EXTRA_KEYS, RULES }
