# prolsms_vue3

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### VueUse工具

npm i @vueuse/core

### el样式覆盖

- style/element/el-mixin.scss

### 图标使用

npm install vite-plugin-svg-icons -D // 方式 1:手动导入并注册图标组件import IconEpApple from '~icons/ep/apple' //方式2：使用 `unplugin-vue-components` 插件来自动注册图标html标签直接使用：`<i-ep-add-location />`

### 菜单跳转

已完成

### 菜单路由标签

已完成

### 侧边菜单展开收起

已完成
### monorepo搭建
apps
    backend-mock
    dashboard
packages
    icons
    stores
    
icon库、store库、mock库


### 宽度自适应调试
