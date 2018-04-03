# rollcall-web

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 一定要加.babelrc文件
```
{
  "presets": ["es2015"],
  "plugins": ["transform-runtime"],
  "env": {
    "targets": {
      "browsers": ["last 2 versions", "IE >= 7"], // 浏览器
      "node": "6.10" // node
    }
  }
}
```
## 注意
```
根地址重定向到首页，需要添加?token方式，可以在router/index.js中放开
```