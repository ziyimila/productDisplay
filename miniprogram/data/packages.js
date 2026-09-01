/**
 * 套餐 / 分类 / 品牌 / 型号 数据
 * 本文件由 tools/import_content.py 从 Excel 内容模板自动生成，请勿直接手改；
 * 修改数据请编辑 Excel 模板，然后重新运行导入脚本。
 * type: standard = 套餐标配（不加价，可有多个不同品牌款式）；upgrade = 升级选配（extraPrice 为补差价）。
 */


const CATEGORIES = [
  { id: 'toilet', name: '马桶', icon: '🚽' },
  { id: 'shower', name: '花洒', icon: '🚿' },
  { id: 'faucet', name: '龙头', icon: '💧' },
  { id: 'tile', name: '瓷砖', icon: '🧱' },
  { id: 'floor', name: '地板', icon: '🪵' },
  { id: 'door', name: '木门', icon: '🚪' },
  { id: 'cabinet', name: '橱柜', icon: '🍳' },
  { id: 'switch', name: '开关插座', icon: '🔌' },
]

const BRANDS = [
  { id: 'sjj', name: '水净界' },
  { id: 'jm', name: '九牧' },
  { id: 'hq', name: '恒洁' },
  { id: 'jp', name: '箭牌' },
  { id: 'mkb', name: '马可波罗' },
  { id: 'dp', name: '东鹏' },
  { id: 'gz', name: '冠珠' },
  { id: 'dzr', name: '大自然' },
  { id: 'sx', name: '圣象' },
  { id: 'mt', name: '梦天' },
  { id: 'tata', name: 'TATA' },
  { id: 'spb', name: '尚品本色' },
  { id: 'op', name: '欧派' },
  { id: 'gj', name: '金牌' },
  { id: 'xmz', name: '西门子' },
  { id: 'gn', name: '公牛' },
]

const MODELS = [
  {
    id: 'sjj-yr', categoryId: 'toilet', brandId: 'sjj', name: '悠然系列 300型', type: 'standard', extraPrice: 0,
    emoji: '🚽',
    images: [],
    specs: [
      { k: '冲水方式', v: '静音双档' },
      { k: '坑距', v: '305/400mm' },
      { k: '水效等级', v: '一级' },
    ],
    desc: '静音节水双档冲水，釉面易洁好打理，套餐标配款。'
  },
  {
    id: 'jm-jingdian', categoryId: 'toilet', brandId: 'jm', name: '经典款 99', type: 'standard', extraPrice: 0,
    emoji: '🚽',
    images: [],
    specs: [
      { k: '冲水方式', v: '虹吸式' },
      { k: '坑距', v: '305mm' },
      { k: '盖板', v: '缓降' },
    ],
    desc: '九牧经典款，虹吸冲水安静有力，缓降盖板，套餐标配款。'
  },
  {
    id: 'jp-jichu', categoryId: 'toilet', brandId: 'jp', name: '基础款 300', type: 'standard', extraPrice: 0,
    emoji: '🚽',
    images: [],
    specs: [
      { k: '冲水方式', v: '喷射虹吸' },
      { k: '水效等级', v: '一级' },
    ],
    desc: '箭牌基础款，喷射虹吸冲水干净，简约耐用，套餐标配款。'
  },
  {
    id: 'sjj-znhw', categoryId: 'toilet', brandId: 'sjj', name: '智能恒温款 300型', type: 'upgrade', extraPrice: 800,
    emoji: '🚽',
    images: [],
    specs: [
      { k: '冲水方式', v: '即热式' },
      { k: '坑距', v: '305/400mm' },
      { k: '主要功能', v: '加热座圈·冲洗' },
    ],
    desc: '即热冲洗不储水，座圈恒温加热，自动除臭，老人小孩用着都方便。'
  },
  {
    id: 'jm-qingshe', categoryId: 'toilet', brandId: 'jm', name: '轻奢款 1250', type: 'upgrade', extraPrice: 300,
    emoji: '🚽',
    images: [],
    specs: [
      { k: '冲水方式', v: '虹吸式' },
      { k: '坑距', v: '305mm' },
      { k: '盖板', v: '缓降' },
    ],
    desc: '全包釉面虹吸冲水，缓降盖板静音不扰人，性价比之选。'
  },
  {
    id: 'jm-qijian', categoryId: 'toilet', brandId: 'jm', name: '智能旗舰款 900', type: 'upgrade', extraPrice: 1500,
    emoji: '🚽',
    images: [],
    specs: [
      { k: '冲水方式', v: '全自动感应' },
      { k: '水压', v: '无水压限制' },
      { k: '主要功能', v: '语音控制' },
    ],
    desc: '全自动感应开合，无水压限制，语音控制，旗舰体验一步到位。'
  },
  {
    id: 'hq-q', categoryId: 'toilet', brandId: 'hq', name: '恒洁 Q系列', type: 'upgrade', extraPrice: 600,
    emoji: '🚽',
    images: [],
    specs: [
      { k: '冲水方式', v: '超漩式' },
      { k: '水效等级', v: '一级' },
    ],
    desc: '超漩冲水强去污，三重瞬洁釉面，清洁无死角。'
  },
  {
    id: 'jp-yun', categoryId: 'toilet', brandId: 'jp', name: '云感陶瓷款', type: 'upgrade', extraPrice: 500,
    emoji: '🚽',
    images: [],
    specs: [
      { k: '冲水方式', v: '虹吸式' },
      { k: '盖板', v: '阻尼缓降' },
    ],
    desc: '云感釉面防挂污，阻尼缓降盖板，静音舒适。'
  },
  {
    id: 'jm-hengwen', categoryId: 'shower', brandId: 'jm', name: '恒温花洒套装', type: 'standard', extraPrice: 0,
    emoji: '🚿',
    images: [],
    specs: [
      { k: '控温', v: '恒温阀芯' },
      { k: '出水', v: '三出水' },
    ],
    desc: '恒温出水不烫不凉，三出水设计，全家人淋浴都舒服。'
  },
  {
    id: 'jp-buxiu', categoryId: 'shower', brandId: 'jp', name: '不锈钢三功能花洒', type: 'standard', extraPrice: 0,
    emoji: '🚿',
    images: [],
    specs: [
      { k: '材质', v: '304不锈钢' },
      { k: '出水', v: '三功能' },
    ],
    desc: '304 不锈钢防锈耐用，三功能出水切换，套餐标配款。'
  },
  {
    id: 'jm-dingpen', categoryId: 'shower', brandId: 'jm', name: '顶喷大流量款', type: 'upgrade', extraPrice: 400,
    emoji: '🚿',
    images: [],
    specs: [
      { k: '顶喷尺寸', v: '250mm' },
      { k: '材质', v: '不锈钢' },
    ],
    desc: '250mm 大顶喷，出水绵密如雨淋，增压效果明显。'
  },
  {
    id: 'sjj-linyu', categoryId: 'shower', brandId: 'sjj', name: '沐浴套装升级款', type: 'upgrade', extraPrice: 350,
    emoji: '🚿',
    images: [],
    specs: [
      { k: '花洒', v: '按摩花洒' },
      { k: '材质', v: '全铜主体' },
    ],
    desc: '全铜主体更耐用，增压按摩花洒，冲走一天疲惫。'
  },
  {
    id: 'jp-sanchushui', categoryId: 'shower', brandId: 'jp', name: '三出水淋浴柱', type: 'upgrade', extraPrice: 500,
    emoji: '🚿',
    images: [],
    specs: [
      { k: '出水模式', v: '三种' },
      { k: '材质', v: '304不锈钢' },
    ],
    desc: '三档出水模式切换，304 不锈钢防锈耐用，颜值在线。'
  },
  {
    id: 'jm-choula', categoryId: 'faucet', brandId: 'jm', name: '抽拉式厨房龙头', type: 'standard', extraPrice: 0,
    emoji: '💧',
    images: [],
    specs: [
      { k: '出水', v: '抽拉双模式' },
      { k: '材质', v: '不锈钢' },
    ],
    desc: '抽拉式出水，冲洗水槽边角很方便，厨房标配款。'
  },
  {
    id: 'jp-chufang', categoryId: 'faucet', brandId: 'jp', name: '厨房冷热龙头', type: 'standard', extraPrice: 0,
    emoji: '💧',
    images: [],
    specs: [
      { k: '冷热', v: '双控' },
      { k: '材质', v: '全铜' },
    ],
    desc: '全铜主体冷热双控，顺滑耐用，厨房标配款。'
  },
  {
    id: 'jm-lengre', categoryId: 'faucet', brandId: 'jm', name: '冷热双控面盆龙头', type: 'upgrade', extraPrice: 200,
    emoji: '💧',
    images: [],
    specs: [
      { k: '冷热', v: '双控' },
      { k: '阀芯', v: '陶瓷阀芯' },
    ],
    desc: '陶瓷阀芯顺滑耐用，冷热双控，洗漱更舒适。'
  },
  {
    id: 'jp-mianpen', categoryId: 'faucet', brandId: 'jp', name: '加高面盆龙头', type: 'upgrade', extraPrice: 180,
    emoji: '💧',
    images: [],
    specs: [
      { k: '高度', v: '加高款' },
      { k: '材质', v: '全铜' },
    ],
    desc: '加高设计洗头方便，全铜主体十年不生锈。'
  },
  {
    id: 'mkb-dalishi', categoryId: 'tile', brandId: 'mkb', name: '通体大理石 800×800', type: 'standard', extraPrice: 0,
    emoji: '🧱',
    images: [],
    specs: [
      { k: '规格', v: '800×800mm' },
      { k: '表面', v: '通体大理石' },
    ],
    desc: '通体大理石纹理逼真，客厅地面首选，耐磨好打理。'
  },
  {
    id: 'dp-putong', categoryId: 'tile', brandId: 'dp', name: '抛光砖 800×800', type: 'standard', extraPrice: 0,
    emoji: '🧱',
    images: [],
    specs: [
      { k: '规格', v: '800×800mm' },
      { k: '光泽', v: '高光' },
    ],
    desc: '高光折射空间显大，抗污易清洁，套餐标配款。'
  },
  {
    id: 'gz-tongti', categoryId: 'tile', brandId: 'gz', name: '通体大理石 800×800', type: 'standard', extraPrice: 0,
    emoji: '🧱',
    images: [],
    specs: [
      { k: '规格', v: '800×800mm' },
      { k: '表面', v: '通体大理石' },
    ],
    desc: '冠珠通体大理石，耐磨抗污，花色选择多，套餐标配款。'
  },
  {
    id: 'mkb-rouguang', categoryId: 'tile', brandId: 'mkb', name: '柔光砖 800×800', type: 'upgrade', extraPrice: 900,
    emoji: '🧱',
    images: [],
    specs: [
      { k: '规格', v: '800×800mm' },
      { k: '光感', v: '柔光 25°' },
    ],
    desc: '柔光不刺眼，脚感温润，适合卧室与客厅通铺。'
  },
  {
    id: 'dp-fanggu', categoryId: 'tile', brandId: 'dp', name: '仿古砖 600×600', type: 'upgrade', extraPrice: 700,
    emoji: '🧱',
    images: [],
    specs: [
      { k: '规格', v: '600×600mm' },
      { k: '表面', v: '仿古防滑' },
    ],
    desc: '防滑耐磨，适合卫生间与阳台，防滑系数高。'
  },
  {
    id: 'gz-puguang', categoryId: 'tile', brandId: 'gz', name: '柔光砖 750×1500', type: 'upgrade', extraPrice: 1100,
    emoji: '🧱',
    images: [],
    specs: [
      { k: '规格', v: '750×1500mm' },
      { k: '光感', v: '柔光' },
    ],
    desc: '大规格柔光砖，缝隙少显大气，客厅通铺效果最佳。'
  },
  {
    id: 'dzr-fuhe', categoryId: 'floor', brandId: 'dzr', name: '复合实木地板', type: 'standard', extraPrice: 0,
    emoji: '🪵',
    images: [],
    specs: [
      { k: '品类', v: '复合实木' },
      { k: '厚度', v: '12mm' },
    ],
    desc: '脚感舒适纹理自然，耐磨易打理，标配款。'
  },
  {
    id: 'sx-fuhe', categoryId: 'floor', brandId: 'sx', name: '复合地板 岩纹系列', type: 'standard', extraPrice: 0,
    emoji: '🪵',
    images: [],
    specs: [
      { k: '品类', v: '复合地板' },
      { k: '耐磨', v: '高耐磨层' },
    ],
    desc: '高耐磨层不怕磕碰，岩纹质感，适合有宠家庭，标配款。'
  },
  {
    id: 'dzr-shiwu', categoryId: 'floor', brandId: 'dzr', name: '多层实木地板', type: 'upgrade', extraPrice: 1200,
    emoji: '🪵',
    images: [],
    specs: [
      { k: '品类', v: '多层实木' },
      { k: '环保等级', v: 'E0级' },
    ],
    desc: '多层实木结构更稳定，E0 级环保，地暖也能用。'
  },
  {
    id: 'sx-strong', categoryId: 'floor', brandId: 'sx', name: '强化地板 高端系列', type: 'upgrade', extraPrice: 400,
    emoji: '🪵',
    images: [],
    specs: [
      { k: '品类', v: '强化地板' },
      { k: '厚度', v: '12mm' },
    ],
    desc: '表面硬度高，防刮耐磨，打理省心。'
  },
  {
    id: 'mt-shifu', categoryId: 'door', brandId: 'mt', name: '实木复合门', type: 'standard', extraPrice: 0,
    emoji: '🚪',
    images: [],
    specs: [
      { k: '材质', v: '实木复合' },
      { k: '五金', v: '静音合页' },
    ],
    desc: '隔音保温效果好，款式百搭，全屋门标配款。'
  },
  {
    id: 'spb-jingdian', categoryId: 'door', brandId: 'spb', name: '经典平板门', type: 'standard', extraPrice: 0,
    emoji: '🚪',
    images: [],
    specs: [
      { k: '风格', v: '简约平板' },
      { k: '材质', v: '烤漆' },
    ],
    desc: '简约平板造型，烤漆工艺，百搭不挑风格，标配款。'
  },
  {
    id: 'tata-jingyin', categoryId: 'door', brandId: 'tata', name: 'TATA 静音门', type: 'upgrade', extraPrice: 800,
    emoji: '🚪',
    images: [],
    specs: [
      { k: '工艺', v: 'TATA静音系统' },
      { k: '密封', v: '四面密封' },
    ],
    desc: '四面密封条降噪明显，卧室安睡就靠它。'
  },
  {
    id: 'spb-qingshe', categoryId: 'door', brandId: 'spb', name: '轻奢极简门', type: 'upgrade', extraPrice: 500,
    emoji: '🚪',
    images: [],
    specs: [
      { k: '风格', v: '轻奢极简' },
      { k: '材质', v: '烤漆' },
    ],
    desc: '极简造型加极窄边框，高级感拉满。'
  },
  {
    id: 'op-shijing', categoryId: 'cabinet', brandId: 'op', name: '石英石台面橱柜', type: 'standard', extraPrice: 0,
    emoji: '🍳',
    images: [],
    specs: [
      { k: '台面', v: '石英石' },
      { k: '柜体', v: '实木颗粒板' },
    ],
    desc: '石英石台面耐刮耐污，经典实用，套餐标配款。'
  },
  {
    id: 'gj-jingdian', categoryId: 'cabinet', brandId: 'gj', name: '石英石台面橱柜', type: 'standard', extraPrice: 0,
    emoji: '🍳',
    images: [],
    specs: [
      { k: '台面', v: '石英石' },
      { k: '柜门', v: '吸塑门板' },
    ],
    desc: '金牌石英石台面，吸塑门板好打理，套餐标配款。'
  },
  {
    id: 'op-yanban', categoryId: 'cabinet', brandId: 'op', name: '岩板台面橱柜', type: 'upgrade', extraPrice: 1500,
    emoji: '🍳',
    images: [],
    specs: [
      { k: '台面', v: '岩板' },
      { k: '柜门', v: '烤漆门板' },
    ],
    desc: '岩板台面耐高温抗渗色，烤漆门板质感高级。'
  },
  {
    id: 'gj-lm', categoryId: 'cabinet', brandId: 'gj', name: '铝合金柜门橱柜', type: 'upgrade', extraPrice: 1000,
    emoji: '🍳',
    images: [],
    specs: [
      { k: '柜门', v: '铝合金' },
      { k: '五金', v: '阻尼铰链' },
    ],
    desc: '铝合金柜门防潮不变形，阻尼铰链开合安静。'
  },
  {
    id: 'xmz-yuanjing', categoryId: 'switch', brandId: 'xmz', name: '远景系列开关', type: 'standard', extraPrice: 0,
    emoji: '🔌',
    images: [],
    specs: [
      { k: '系列', v: '远景' },
      { k: '材质', v: '阻燃PC' },
    ],
    desc: '阻燃面板更安全，大间距插孔，全屋标配款。'
  },
  {
    id: 'gn-putong', categoryId: 'switch', brandId: 'gn', name: '普通五孔插座', type: 'standard', extraPrice: 0,
    emoji: '🔌',
    images: [],
    specs: [
      { k: '系列', v: '基础款' },
      { k: '材质', v: '阻燃PC' },
    ],
    desc: '基础五孔插座，安全耐用，套餐标配款。'
  },
  {
    id: 'xmz-lingxi', categoryId: 'switch', brandId: 'xmz', name: '灵犀系列插座', type: 'upgrade', extraPrice: 300,
    emoji: '🔌',
    images: [],
    specs: [
      { k: '系列', v: '灵犀' },
      { k: '功能', v: 'USB快充' },
    ],
    desc: '带 USB 快充口，床头、沙发边充电更方便。'
  },
  {
    id: 'gn-g29', categoryId: 'switch', brandId: 'gn', name: '公牛 G29 系列', type: 'upgrade', extraPrice: 250,
    emoji: '🔌',
    images: [],
    specs: [
      { k: '系列', v: 'G29' },
      { k: '材质', v: '钢化玻璃' },
    ],
    desc: '钢化玻璃面板，无边框设计，颜值与手感兼具。'
  },
]

// 套餐计价规则（由 Excel「计价规则」表生成）
// 套餐为一口价，覆盖标准面积与标准户型；超出标准面积按套餐单价/㎡核算，
// 超出户型只有卫生间按该套餐 extraRates 单价（元/间）单独核算，其他超出房间按面积核算。
const RULES = {
  stdArea: 90,
  stdRoom: {
    bedroom: 2,
    kitchen: 1,
    bathroom: 1,
    dining: 1,
    living: 1,
  }
}

const PACKAGES = [
  { id: 'p498', name: '498 轻奢套餐', basePrice: 49800, perSqmRate: 498, tag: '整装全包', hot: true, categories: ['toilet', 'shower', 'faucet', 'tile', 'floor', 'door', 'cabinet', 'switch'], extraRates: { bathroom: 5000 }, materials: [{ label: '水管', value: '皮尔萨', options: ['皮尔萨'], prefix: '' }, { label: '电线', value: '长江', options: ['长江'], prefix: '' }, { label: '水泥', value: '普通325', options: ['普通325'], prefix: '' }, { label: '板材', value: '普通生态板', options: ['普通生态板'], prefix: '' }, { label: '腻子', value: '壁丽宝', options: ['壁丽宝'], prefix: '' }, { label: '油漆', value: '立邦净味120、美得丽', options: ['立邦净味120', '美得丽'], prefix: '' }] },
  { id: 'p698', name: '698 臻选套餐', basePrice: 69800, perSqmRate: 698, tag: '整装全包', hot: false, categories: ['toilet', 'shower', 'faucet', 'tile', 'floor', 'door', 'cabinet', 'switch'], extraRates: { bathroom: 8000 }, materials: [{ label: '水管', value: '保利、中财', options: ['保利', '中财'], prefix: '' }, { label: '电线', value: '起帆', options: ['起帆'], prefix: '' }, { label: '水泥', value: '海螺425', options: ['海螺425'], prefix: '' }, { label: '板材', value: '品牌生态板（兔宝宝、大王椰、莫干山、千年舟）', options: ['兔宝宝', '大王椰', '莫干山', '千年舟'], prefix: '品牌生态板' }, { label: '腻子', value: '立邦', options: ['立邦'], prefix: '' }, { label: '油漆', value: '立邦金装五合一', options: ['立邦金装五合一'], prefix: '' }] },
]


/* ---------------- 查询工具 ---------------- */

function getPackageById(id) {
  return PACKAGES.find((p) => p.id === id)
}

function getCategoryById(id) {
  return CATEGORIES.find((c) => c.id === id)
}

function getBrandById(id) {
  return BRANDS.find((b) => b.id === id)
}

function getModelById(id) {
  return MODELS.find((m) => m.id === id)
}

function getModelsByCategory(categoryId) {
  return MODELS.filter((m) => m.categoryId === categoryId)
}

function getModelsByCategoryAndBrand(categoryId, brandId) {
  return MODELS.filter((m) => m.categoryId === categoryId && m.brandId === brandId)
}

// 某个分类下套餐标配（不加价）的所有型号
function getStandardModels(categoryId) {
  return getModelsByCategory(categoryId).filter((m) => m.type === 'standard')
}

// 默认标配型号（取第一款，客户可自由换成其他标配款）
function getStandardModel(categoryId) {
  const list = getStandardModels(categoryId)
  return list[0] || null
}

// 某个分类下有哪些品牌（按该分类型号出现的顺序去重）
function getBrandsOfCategory(categoryId) {
  const result = []
  getModelsByCategory(categoryId).forEach((m) => {
    if (!result.some((b) => b.id === m.brandId)) {
      const brand = getBrandById(m.brandId)
      if (brand) result.push(brand)
    }
  })
  return result
}

// 套餐完整信息：套餐 + 每个分类（含品牌及品牌下的型号）
function getPackageFull(packageId) {
  const pkg = getPackageById(packageId)
  if (!pkg) return null
  const categories = (pkg.categories || []).map((cid) => {
    const cat = getCategoryById(cid)
    if (!cat) return null
    const brands = getBrandsOfCategory(cid).map((b) => ({
      id: b.id,
      name: b.name,
      models: getModelsByCategoryAndBrand(cid, b.id)
    }))
    return Object.assign({}, cat, { brands })
  }).filter(Boolean)
  return Object.assign({}, pkg, { categories })
}

module.exports = {
  CATEGORIES,
  BRANDS,
  MODELS,
  PACKAGES,
  RULES,
  getPackageById,
  getCategoryById,
  getBrandById,
  getModelById,
  getModelsByCategory,
  getModelsByCategoryAndBrand,
  getStandardModels,
  getStandardModel,
  getBrandsOfCategory,
  getPackageFull
}
