# ydoc-plugin-vue-styleguide

根据代码结构和注释，生成 vue 组件文档，基于 [vue-styleguide](https://github.com/vue-styleguidist/vue-styleguidist) 

### 快速开始

1.在项目目录下 install 插件：

```
npm install ydoc-plugin-vue-styleguide

```

2.在项目根目录 ydoc.js 中配置插件参数：

```js
module.exports = {
  plugins: ['vue-styleguide'],
  pluginsConfig: {
    "vue-styleguide": {
      'vue-styleguide': vueStyleguideOptions
  }
}
```
`vueStyleguideOptions` 配置请查看[官方文档](https://github.com/vue-styleguidist/vue-styleguidist/blob/master/docs/Configuration.md)

3.在导航添加链接

打开 docs/NAV.md，添加以下markdown:

```markdown
* [组件](/vue-components/index.html)
```


### Example

```js
const webpackConfig = {
  devtool: 'inline-source-map',
  resolve:{
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader'],
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use:   ['style-loader','css-loader'],
      },
      {
        test: /\.scss|sass$/,
        use: ['style-loader','css-loader','sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/image/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.mp3$/,
        use: [
          {
            loader: 'url-loader',
            query: {
              limit: 1,
              name: 'static/voice/[name].[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
}

module.exports = {
  plugins: ['vue-styleguide'],
  pluginsConfig: {
    "vue-styleguide": {
      'vue-styleguide': {
      components: './components/**/index.vue', //组件文档路径
      //webpack配置
      webpackConfig 
    }
  }
}
```