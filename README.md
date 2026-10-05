# OceanLens 海洋透視鏡

> 一個結合海洋科普、互動學習、生態環境模擬及資料視覺化的海洋教育 Web Application。

**核心概念：** 讓不能潛水的人，也能探索海洋。

## 專案特色

- **互動式海洋深度探索** - 探索不同深度的海洋環境與生物（含 3D 場景）
- **海洋生物資料庫** - 完整的海洋生物資訊與詳細介紹（含 3D 模型檢視器）
- **生態系統模擬** - 即時模擬環境變化對海洋生態的影響
- **AI 科普助手** - 智能問答系統（UI 已完成，預留 API 整合空間）
- **3D 沉浸式體驗** - Three.js 3D 海洋場景與生物模型（Phase 2 完成）
- **WebAR 探索體驗** - 手機 AR 海洋生物觀察（Phase 3 完成）

## 技術堆疊

### 前端框架
- **React** - UI 框架
- **Vite** - 建置工具
- **React Router** - 路由管理

### UI 組件與樣式
- **Lucide React** - Icon 圖庫
- **Framer Motion** - 動畫效果
- **CSS Variables** - Design System

### 資料視覺化
- **Recharts** - 圖表庫

### 3D 圖形
- **Three.js** - 3D 引擎
- **React Three Fiber** - React Three.js 整合
- **React Three Drei** - Three.js 輔助工具

### WebAR
- **AR.js** - WebAR 引擎

## 專案結構

```
src/
├── components/          # 可重用元件
│   ├── Button/         # 按鈕元件
│   ├── Card/           # 卡片元件
│   ├── Navbar/         # 導航列
│   ├── Footer/         # 頁尾
│   ├── SectionTitle/  # 區塊標題
│   ├── MetricCard/     # 數據卡片
│   ├── SpeciesCard/    # 生物卡片
│   ├── DepthSelector/  # 深度選擇器
│   ├── SliderControl/  # 滑桿控制器
│   ├── ChartCard/      # 圖表卡片
│   ├── ChatMessage/    # 聊天訊息
│   └── 3d/             # 3D 元件
│       ├── OceanScene.jsx        # 海洋場景
│       ├── DepthEnvironment.jsx   # 深度環境
│       ├── OceanParticles.jsx     # 海洋粒子
│       ├── MarineCreature.jsx     # 海洋生物（Placeholder）
│       ├── MarineCreatureViewer.jsx # 3D 檢視器
│       ├── CameraController.jsx   # 相機控制
│       ├── Loading3D.jsx          # 載入狀態
│       └── Fallback3D.jsx          # 錯誤回退
│   └── ar/              # AR 元件
│       ├── ARScene.jsx           # AR 場景
│       ├── ARLoading.jsx          # AR 載入狀態
│       ├── ARError.jsx            # AR 錯誤回退
│       ├── ARPermission.jsx       # AR 權限請求
│       ├── ARFallback.jsx         # AR 桌面回退
│       ├── ARControls.jsx         # AR 控制器
│       └── ARInfoCard.jsx         # AR 資訊卡
├── pages/              # 頁面元件
│   ├── Home.jsx        # 首頁
│   ├── Explore.jsx     # 海洋探索
│   ├── Species.jsx     # 海洋生物列表
│   ├── SpeciesDetail.jsx # 生物詳情
│   ├── Simulation.jsx  # 生態模擬
│   └── AI.jsx          # AI 助手
├── layouts/            # 佈局元件
│   └── MainLayout.jsx  # 主佈局
├── data/               # Mock 資料
│   ├── oceanData.js    # 海洋數據
│   ├── speciesData.js  # 生物資料
│   ├── simulationData.js # 模擬數據
│   ├── chatData.js     # 聊天數據
│   ├── species3D.js    # 3D 模型資料
│   └── arModels.js     # AR 模型資料
├── services/           # 服務層
│   └── aiService.js    # AI 服務（預留 API 整合）
├── styles/             # 樣式檔案
│   ├── variables.css   # CSS 變數
│   └── global.css      # 全域樣式
└── App.jsx             # 應用程式入口
```

## 安裝與執行

### 安裝依賴
```bash
npm install
```

### 開發模式
```bash
npm run dev
```

### 建置生產版本
```bash
npm run build
```

### 預覽生產版本
```bash
npm run preview
```

## HTTPS 部署注意事項

### WebAR 相機功能要求

WebAR 的相機功能通常需要以下環境之一才能正常運作：

- **HTTPS** - 生產環境必須使用 HTTPS 協議
- **localhost** - 開發環境可使用 localhost

**重要：** HTTP 網址通常無法啟動相機功能，這是瀏覽器的安全限制。

### 部署建議

#### 開發環境
```bash
npm run dev
# 使用 localhost:5173 自動支援相機
```

#### 生產環境
- 使用支援 HTTPS 的託管服務（如 Vercel、Netlify、GitHub Pages）
- 確保 SSL/TLS 憑證正確配置
- 測試相機功能是否正常運作

#### 常見部署平台
- **Vercel**: 自動 HTTPS，推薦使用
- **Netlify**: 自動 HTTPS，推薦使用
- **GitHub Pages**: 自動 HTTPS，推薦使用
- **自託管**: 需手動配置 SSL 憑證（Let's Encrypt）

### 瀏覽器相容性

#### 支援 WebAR 的瀏覽器
- iOS Safari (iOS 11+)
- iOS Chrome
- Android Chrome
- Android Edge

#### 不支援的瀏覽器
- 桌面版瀏覽器（無相機）
- 部分舊版瀏覽器

### 測試清單
- [ ] HTTPS 部署成功
- [ ] 手機 iOS Safari 可開啟相機
- [ ] 手機 Android Chrome 可開啟相機
- [ ] AR 模型正常載入
- [ ] QR Code 可正常掃描

## 頁面說明

### 首頁 (`/`)
- Hero Section 展示品牌標語
- 海洋數據統計（71% 海洋覆蓋率、80%+ 未探索）
- 核心功能介紹（4 個功能卡片）
- 傳統教育 vs OceanLens 比較
- CTA 行動呼籲

### 海洋探索 (`/explore`)
- 互動式深度選擇器（0m - 6000m）
- **3D 海洋場景** - 深度環境即時變化
- 即時顯示各深度環境資訊
- 光線、溫度、水壓數據
- 主要生物介紹
- 3D 粒子效果與氣泡動畫

### 海洋生物 (`/species`)
- 搜尋功能
- 分類篩選（深海、珊瑚礁、大型生物、無脊椎動物）
- 生物卡片展示（6 種生物）
- 點擊進入詳情頁

### 生物詳情 (`/species/:id`)
- **3D 模型檢視器** - 可旋轉、縮放、自動旋轉
- **AR 探索按鈕** - 手機 AR 體驗
- 詳細生物介紹
- 基本資訊（體型、食性、保育狀況）
- 棲息環境資訊
- 有趣事實

### 生態模擬 (`/simulation`)
- 環境控制器（溫度、污染、塑膠）
- 即時生態指標（珊瑚健康度、生物多樣性、魚群數量、生態健康度）
- 互動式圖表（溫度 vs 珊瑚、污染 vs 多樣性、環境 vs 生態）

### AI 科普助手 (`/ai`)
- 現代化聊天介面
- 建議問題提示
- Mock 回應系統
- 預留 AI API 整合空間

## Design System

### 色彩系統
- `--color-ocean` - 海洋藍
- `--color-deep` - 深海藍
- `--color-accent` - 強調色（青綠色）
- `--color-surface` - 表面色
- `--color-text` - 文字色

### 響應式設計
- Mobile First 設計
- 支援 Desktop、Tablet、Mobile
- 斷點：768px、1024px

## 未來擴充計畫

### Phase 2: 3D 整合 ✅ 已完成
- ✅ Three.js 3D 海洋場景
- ✅ 深度環境動態變化（0m-6000m）
- ✅ 3D 粒子效果與氣泡動畫
- ✅ 3D 生物模型檢視器
- ✅ Placeholder 海洋生物（使用幾何體）
- ⏳ TODO: 替換為授權 GLB/GLTF 模型

### Phase 3: WebAR ✅ 已完成
- ✅ AR.js WebAR 整合
- ✅ 相機權限請求處理
- ✅ AR 場景與模型載入
- ✅ AR 控制器（旋轉、縮放、重置）
- ✅ AR 資訊卡（生物資訊）
- ✅ 桌面 Fallback（QR Code）
- ✅ 載入/錯誤狀態處理
- ✅ 響應式 AR UI
- ⏳ TODO: 整合實際 AR.js marker 追蹤
- ⏳ TODO: 替換為授權 GLB/GLTF 模型
- ⏳ TODO: 建立正式 AR Marker

### Phase 3.5: WebAR 優化 ✅ 已完成
- ✅ AR 使用說明流程（三步驟教學）
- ✅ 步驟式載入訊息（初始化/相機/Marker/模型）
- ✅ 增強錯誤處理（7 種錯誤類型）
- ✅ 真實 QR Code 生成（qrcode.react）
- ✅ GLB/GLTF 載入架構（MarineARModel）
- ✅ 完整 AR 模型資料結構
- ✅ Lazy loading 3D/AR 元件
- ✅ HTTPS 部署說明文件
- ✅ Accessibility 改善
- ⏳ TODO: 替換為授權 GLB/GLTF 模型
- ⏳ TODO: 建立正式 AR Marker
- ⏳ TODO: 實機測試（iOS/Android）
- ⏳ TODO: HTTPS 生產環境部署

### Phase 4: AI API
- OpenAI API 整合
- 智譜 API 整合
- 真實 AI 問答系統

### Phase 5: 後端
- Node.js 後端服務
- RESTful API
- 用戶系統

### Phase 6: 資料庫
- MongoDB / PostgreSQL
- 用戶資料管理
- 學習進度追蹤

## 程式架構優勢

- **模組化設計** - 每個頁面和元件獨立
- **可維護性** - 清晰的檔案結構
- **可擴充性** - 預留未來功能整合空間
- **服務層抽象** - AI 服務已抽象化，方便替換 API
- **Mock 資料分離** - 資料與 UI 分離，易於替換為真實 API
- **3D 架構分離** - 3D 元件獨立於 UI，易於替換模型
- **AR 架構分離** - AR 元件獨立於 3D，易於擴充
- **效能優化** - 限制 pixel ratio、粒子數量，確保流暢體驗

## Phase 2 完成項目

### 新增檔案
- `src/components/3d/OceanScene.jsx` - 海洋場景主元件
- `src/components/3d/DepthEnvironment.jsx` - 深度環境控制
- `src/components/3d/OceanParticles.jsx` - 粒子效果
- `src/components/3d/MarineCreature.jsx` - Placeholder 生物模型
- `src/components/3d/MarineCreatureViewer.jsx` - 3D 檢視器
- `src/components/3d/CameraController.jsx` - 相機控制
- `src/components/3d/Loading3D.jsx` - 載入狀態
- `src/components/3d/Fallback3D.jsx` - 錯誤回退
- `src/data/species3D.js` - 3D 模型資料結構

### 修改檔案
- `src/pages/Explore.jsx` - 整合 3D 海洋場景
- `src/pages/SpeciesDetail.jsx` - 整合 3D 檢視器
- `package.json` - 新增 Three.js 相關套件

### 新增套件
- `three` - 3D 引擎
- `@react-three/fiber` - React Three.js 整合
- `@react-three/drei` - Three.js 輔助工具
- `react-is` - React 類型檢查（Recharts 依賴）

### 3D 功能特性
- **深度環境系統**: 0m-6000m 深度動態變化光線、霧化、背景色
- **粒子系統**: 氣泡動畫，密度隨深度增加
- **Placeholder 生物**: 使用幾何體組合臨時海洋生物
- **3D 檢視器**: 支援旋轉、縮放、自動旋轉
- **載入狀態**: 優雅的載入動畫
- **錯誤處理**: 友善的錯誤回退介面
- **響應式設計**: 支援 Desktop、Tablet、Mobile

## Phase 3 完成項目

### 新增檔案
- `src/components/ar/ARScene.jsx` - AR 場景主元件
- `src/components/ar/ARScene.css` - AR 場景樣式
- `src/components/ar/ARLoading.jsx` - AR 載入狀態
- `src/components/ar/ARLoading.css` - AR 載入樣式
- `src/components/ar/ARError.jsx` - AR 錯誤回退
- `src/components/ar/ARError.css` - AR 錯誤樣式
- `src/components/ar/ARPermission.jsx` - AR 權限請求
- `src/components/ar/ARPermission.css` - AR 權限樣式
- `src/components/ar/ARFallback.jsx` - AR 桌面回退
- `src/components/ar/ARFallback.css` - AR 回退樣式
- `src/components/ar/ARControls.jsx` - AR 控制器
- `src/components/ar/ARControls.css` - AR 控制樣式
- `src/components/ar/ARInfoCard.jsx` - AR 資訊卡
- `src/components/ar/ARInfoCard.css` - AR 資訊樣式
- `src/data/arModels.js` - AR 模型資料結構

### 修改檔案
- `src/pages/SpeciesDetail.jsx` - 整合 AR 按鈕與場景
- `src/pages/SpeciesDetail.css` - 新增 AR 按鈕樣式
- `package.json` - 新增 AR.js 套件

### 新增套件
- `ar.js` - WebAR 引擎

### AR 功能特性
- **相機權限**: 自動請求相機權限，友善處理拒絕
- **裝置檢測**: 自動檢測 Mobile/Desktop，Desktop 顯示 Fallback
- **AR 控制器**: 旋轉、移動、縮放、重置、自動旋轉
- **AR 資訊卡**: 顯示生物名稱、英文名稱、深度、簡介
- **載入狀態**: 優雅的載入動畫
- **錯誤處理**: 友善的錯誤回退與重試機制
- **桌面 Fallback**: QR Code placeholder，提示使用手機
- **Design System**: 維持 OceanLens 深海藍、Glassmorphism 風格
- **響應式設計**: 支援 Mobile、Tablet、Desktop

### AR 使用流程
1. 使用者在 SpeciesDetail 頁面點擊「AR 探索」
2. 檢測裝置類型（Mobile/Desktop）
3. Desktop: 顯示 Fallback 與 QR Code
4. Mobile: 顯示 AR 使用說明
5. 使用者點擊「開始 AR」
6. 請求相機權限
7. 載入 AR 場景與 3D 模型
8. 顯示 AR 控制器與資訊卡
9. 使用者可互動操作模型

### Phase 3.5 完成項目

### 新增檔案
- `src/components/ar/MarineARModel.jsx` - GLB/GLTF 模型載入元件
- `src/components/ar/ARInstructions.jsx` - AR 使用說明
- `src/components/ar/ARInstructions.css` - AR 說明樣式
- `public/ar/oceanlens-marker.png` - AR Marker placeholder
- `public/ar/README.md` - Marker 使用說明
- `public/models/` - 模型資料夾（待放入 GLB 模型）

### 修改檔案
- `src/components/ar/ARScene.jsx` - 整合新元件與資料結構
- `src/components/ar/ARLoading.jsx` - 新增步驟式載入訊息
- `src/components/ar/ARError.jsx` - 增強錯誤類型處理
- `src/components/ar/ARFallback.jsx` - 整合真實 QR Code
- `src/components/ar/ARFallback.css` - QR Code 樣式調整
- `src/data/arModels.js` - 完善資料結構
- `src/pages/SpeciesDetail.jsx` - Lazy loading 3D/AR 元件
- `src/pages/SpeciesDetail.css` - Loading placeholder 樣式
- `src/pages/Explore.jsx` - Lazy loading 3D 元件
- `src/pages/Explore.css` - Loading placeholder 樣式
- `package.json` - 新增 qrcode.react 套件
- `README.md` - 新增 HTTPS 部署說明

### 新增套件
- `qrcode.react` - QR Code 生成

### Phase 3.5 功能特性
- **AR 使用說明**: 三步驟教學流程
- **步驟式載入**: 初始化 → 相機 → Marker → 模型
- **增強錯誤處理**: 7 種錯誤類型精確處理
- **真實 QR Code**: 使用 qrcode.react 動態生成
- **GLB/GLTF 架構**: MarineARModel 支援真實模型載入
- **完整資料結構**: arModels.js 包含所有必要資訊
- **Lazy Loading**: 3D/AR 元件按需載入，優化效能
- **HTTPS 部署說明**: 完整部署指南
- **Accessibility**: aria-label 改善

## 授權

© 2026 OceanLens. All rights reserved.

## 貢獻

此專案為科技創新比賽作品，目前由開發團隊維護。
