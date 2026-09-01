# 装修套餐展示小程序

给客户展示装修套餐（49800 / 69800 元一口价）及每个位置可选材料（品牌 + 型号 + 图片说明 + 升级加价）的微信小程序。客户可从"选套餐"一路选到"出方案报价"。

## 计价方式

- 套餐按户一口价，覆盖 **90㎡·2房1厨1卫1餐1厅** 标准户型（见 `miniprogram/data/packages.js` 的 `RULES`）
- 超出 90㎡ 的部分：按套餐单价（498/698 元/㎡）另算
- 户型超出：只有「多个卫生间」按**该套餐自己的** `extraRates.bathroom` 单价（元/间）单独核算（498 +5000 / 698 +8000，不同套餐可不同）；其他超出房间（如多卧室）按面积核算、不单独加价
- 材质升级差价：所选升级型号的补差价合计（套餐标配不加价，可多款任选）

## 功能与页面

- **首页**：套餐卡片，展示一口价、覆盖户型、超出面积单价、品类与品牌、套餐包含基础材料（水管/电线/水泥/板材/腻子/油漆）
- **材质选择**：套餐基础材料可选（水管/电线/水泥/板材/腻子/油漆，套餐内品牌任选、均不加价）＋位置分类 + 品牌横滑切换，型号卡片同屏对比「标配 / 升级 +¥」，行内"+"快捷选/取消
- **型号详情**：多图切换（占位）、规格参数、产品说明、一键加入方案
- **方案清单**：面积 + 户型步进器输入，自动核算一口价、超面积、超户型、升级差价，一键复制方案文案
- **联系我**：公司电话 / 微信 / 地址（示例信息，需替换）

## 运行方法

1. 安装并打开 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 选择「导入项目」，目录选本仓库根目录（已带 `project.config.json`）
3. AppID 先用「测试号」（`touristappid`）即可预览；正式发布前替换成你的 AppID
4. 编译后即可在模拟器中浏览全部页面

## 数据与图片替换

推荐用 Excel 内容模板维护数据（见下节「内容模板」）。模板填好后运行导入脚本自动生成 `miniprogram/data/packages.js`，也可以直接手工改该文件。

所有展示数据集中在 `miniprogram/data/packages.js`：

- `PACKAGES`：套餐（名称 / `basePrice` 一口价 / `perSqmRate` 超出面积单价 / 包含分类 / `extraRates` 该套餐自己的超出户型单价）
- `RULES`：计价规则（标准面积 `stdArea`、标准户型 `stdRoom`）
- `CATEGORIES`：位置分类（马桶、瓷砖、地板…）
- `BRANDS`：品牌
- `MODELS`：型号（`type: "standard"` 套餐标配可多款 / `"upgrade"` 升级，`extraPrice` 为补差价）

图片：把实拍图放入 `miniprogram/images/`，在对应型号的 `images` 数组填路径（如 `/images/toilet-xxx.jpg`）；未填路径时显示 emoji 占位图。

真机信息（电话 / 微信 / 地址）在 `miniprogram/pages/contact/contact.js` 顶部替换。

## 内容模板（Excel 维护）

模板文件：`outputs/01a05337-61ef-7090-9ab3-d4456627ff26/装修套餐内容模板.xlsx`（已预填示例数据）

工作表：
- **使用说明**：填写步骤、规则与当前待定事项
- **计价规则**：标准面积 / 标准户型（黄色格可改）
- **套餐**：一口价、超面积单价、热门标记、包含分类，以及**该套餐自己**的「超出·卫生间」单价（元/间；多1卫生间的加价待真实报价；其他超出房间按面积核算、不单独加价）
- **分类 / 品牌**：材料大类与品牌
- **型号**：每个品牌下的具体款式；`类型` 填「标配」（不加价，可多款任选）或「升级」（需填补差价）；`规格说明` 一行一条「项目：内容」；`图片路径` 填写 `images` 目录下的相对路径，多张用英文逗号分隔

填好后生成数据：

```bash
python tools/import_content.py                     # 默认读模板、写 miniprogram/data/packages.js
python tools/import_content.py --dry-run           # 只校验不写文件
```

导入脚本会自动校验：id 唯一、分类/品牌引用存在、每个被套餐包含的分类至少 1 款标配、标配补差价必须为 0 等，校验失败会列出具体错误。

## 结构

```
miniprogram/
  app.js / app.json / app.wxss
  data/packages.js          # 套餐、计价规则、分类、品牌、型号数据
  utils/
    format.js               # 金额格式化
    quote.js                # 报价计算（一口价 + 超面积 + 超户型 + 升级）
  images/                   # 实拍图（占位说明见 README.txt）
  pages/
    index/                  # 首页 · 套餐列表
    materials/              # 材质选择
    model-detail/           # 型号详情
    plan/                   # 方案清单 · 报价
    contact/                # 联系我
tools/
  import_content.py         # 从 Excel 内容模板生成 packages.js（含数据校验）
outputs/…/装修套餐内容模板.xlsx   # 内容填写模板（黄色格可编辑）
```

## 设计文档

`docs/superpowers/specs/2026-08-30-wechat-product-display-design.md`

## 后续可迭代

- 管理后台 / 云数据库动态维护套餐、型号与报价规则
- 多图切换、型号对比、预约量房
- 客户登录后保存多个方案
