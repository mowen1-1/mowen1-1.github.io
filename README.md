# 墨痕小记

> 记录生活里的细碎光亮

温暖文艺风的个人博客，纯 HTML/CSS/JS 实现，零依赖零构建。

## 预览

直接用浏览器打开 `index.html` 即可，或访问部署后的 GitHub Pages 地址。

## 部署到 GitHub Pages

1. 创建名为 `用户名.github.io` 的仓库（将"用户名"替换为你的 GitHub 用户名）
2. 将本目录所有文件推送到 `main` 分支
3. 进入仓库 **Settings → Pages**
4. **Source** 选择 `Deploy from a branch`
5. **Branch** 选择 `main`，文件夹选 `/ (root)`
6. 保存后等待 1-2 分钟，访问 `https://用户名.github.io/` 即可

## 目录结构

```
├── index.html          # 首页（秋叶飘落 + 黑猫跟随鼠标）
├── posts.html          # 全部文章
├── about.html          # 关于
├── categories.html     # 分类列表
├── tags.html           # 标签云
├── post-*.html         # 各篇文章
├── category-*.html     # 各分类页
├── tag-*.html          # 各标签页
├── css/style.css       # 样式
├── js/main.js          # 交互（秋叶、黑猫、主题切换）
├── .nojekyll           # 禁用 Jekyll
└── .gitignore
```

## 特性

- 纯静态，无需服务器、无需构建工具
- 温暖文艺风：米色/暖棕色调、衬线字体、柔和阴影
- 秋叶飘落动画（枫叶/银杏/椭圆三种形状）
- 黑猫跟随鼠标（瞳孔追踪 + 头部旋转）
- 深色/浅色主题切换
- 响应式布局，适配手机和桌面

---

由 林溪 用 ♥ 书写
