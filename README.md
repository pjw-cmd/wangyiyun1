# electron-vue-cloud-music

> Electron+Vue+Ant Design 

## Build from source code

npm install 

npm run start

## 技术栈

- vue
- electron
- axios

## src 目录结构

- main 主进程来维护窗口
- renderer 渲染进程，来维护一个个的页面
  - api  用到的api
  - assets
  - components 自定义的一些组件。
  - config  配置
  - core
  - datastore
  - directives 
  - filters  
  - layouts 布局，类似国家战略 
  - mixins 
  - plugins 
  - router 页面导航逻辑
  - store  全局变量
  - styles 页面style
  - utils 自定义的常用工具类
  - views 页面。页面由一些组件组成
