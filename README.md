# chuangbie

	创别书城项目

#   项目开发流程
  ##    第一步：初始化开发环境
  > 1、排除node_modules文件检索
  >
  > 2、扩展文件.css后缀省略引入
  >
  > 3、注释自动检查代码格式代码
  >
  > 4、路由模式设置成history

  ##  第二步：安装并引入所需使用的依赖包
  > 1、UI组件 —— iView + swiper
  ```
  $ npm install iview --save
  $ npm install vue-awesome-swiper --save
  ```
  >
  > 2、模块组件 —— axios
  ```
  $ npm i axios -D
  $ npm i vue-axios -D
  ```

  ##    第三步：创建并分配所需文件
  > 1、@/views文件（具体页面成型）
  >> home（首页页面）
  >> classify（分类页面）
  >> rank（排行页面）
  >> women（女区页面）
  >> men（男区页面）
  >> booklist（书单页面）
  >
  > 2、@/components文件（页面模板组件）
  >> Topbar.vue（顶部组件）
  >> Footer.vue（页脚组件）

  ##    第四步：完成基本页面的路由分配
  > 1、分配根路径页面
  >
  > 2、分配'/home'路径页面
  >
  > 3、分配其他路由页面
  >
  > 4、分配'*'没有指定路径的出错访问页面

  ##    第五步：完成模板组件和基本页面布局与样式
  > 1、完成顶部、Swiper、页脚的模板组件布局和样式
  >> Swiper坑1：以下代码必须写在home/index.vue文件里面
  ```
    import Vue from 'vue'
    import VueAwesomeSwiper from 'vue-awesome-swiper'
    Vue.use(VueAwesomeSwiper)
  ```
  >> Swiper坑2：无法自动切换轮播图，请在依赖包里的swiper.js文件修改autoplayDisableOnInteraction属性 true -> false
  ```
    autoplayDisableOnInteraction: false,
  ```
  >
  > 2、
  >
  > 你可能遇到的坑：
  >> （1）自定义组件的元素标签名不能与HTML已有的标签名重复
  >> （2）插件使用总结：哪里用到插件，就在哪个vue模块组件里引入插件！
  >>

  ##    第六步、为前期留出来的位置注入API数据
  >
  >
  > 你可能遇到的坑：
  >> （1）axios无法解决跨域问题
  >
  >> （2）JSON可以解决跨域问题，但使用时特别注意this重定向以及在使用组件引入JSONP模块

  ##    项目打包注意事项
  > 1、根目录的路径问题 -> 生产配置config/index.js/assetsPublicPath属性改为“./”
  ```
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
      }
  ```
  >
  > 2、路径模式不可为"history"
  ```
    export default new Router({
      //mode: 'history',
      ...
    })
  ```
  >
  > 3、背景图片路径问题
  >> 背景路径以动态路径写在标签属性内
  ```
    :style="{ backgroundImage: 'url(' + bg + ')'}"
  ```
  >> 背景路径以变量写在vue实例的data属性内
  ```
    data: function(){
      return {
        bg: require('../../assets/img/router.png')
      }
    }
  ```
  >
  > 4、UI插件引入路径问题 -> 根据错误的路径，新建文件夹，讲字体丢进去
  >> 路径重复报错如下
  ```
    swiper.js:4928GET file:///E:/web/project/zhuliu/my-project/dist/static/css/static/fonts/ionicons.24712f6.ttf net::ERR_FILE_NOT_FOUNDcss @ swiper.js:4928t @ swiper.js:470o @ app.67e006f….js:406e @ swiper.vue:62mounted @ app.67e006f….js:411Me @ vue.esm.js:2646insert @ vue.esm.js:3501S @ vue.esm.js:5440e.nodeOps @ vue.esm.js:5610e._update @ vue.esm.js:2395i @ vue.esm.js:2519Ha.get @ vue.esm.js:2862Ha @ vue.esm.js:2851_e @ vue.esm.js:2523xt.$mount @ vue.esm.js:7842xt.$mount @ vue.esm.js:10045e._init @ vue.esm.js:4207xt @ vue.esm.js:4292(anonymous function) @ main.js:33n @ bootstrap 561b45d…:54window.webpackJsonp @ bootstrap 561b45d…:25(anonymous function) @ app.67e006f….js:1
    index.html:1 GET file:///E:/web/project/zhuliu/my-project/dist/static/css/static/fonts/ionicons.05acfdb.woff net::ERR_FILE_NOT_FOUND
  ```
  >> 新建static/fonts文件夹，纠正无法找到文件路径的错误
  ```
    static/css/static/fonts/ionicons.24712f6.ttf
    static/css/static/fonts/ionicons.05acfdb.woff
  ```

  ##    开发过程需要解决的问题集合：
  > 1、跨域的问题【以下方法实测不行】
  >> 使用api代理（config/index.js -> dev.proxyTable: {}）
```
    proxyTable: {
        '/api/**': {
        target: 'http://127.0.0.1:8089', // 你接口的域名
        secure: false,      // 如果是https接口，需要配置这个参数
        changeOrigin: true,     // 如果接口跨域，需要进行这个参数配置
      },
      '/users/*':{
        target:'http://127.0.0.1:8089'
      }
    },
```
  >> 请求时路由要加 '/设置的代理名/'
```
    getUser(){
        this.$http.get('/api/')
          .then((res) => {
              console.log(res)
          })
          .catch((error) => {
            console.log(error)
          })
    }
```
  >
  > 2、子组件数据在父组件中使用
  >
  > 3、API请求数据地址相关的过滤
  >
  > 4、v-for 列表数据获取完后如何重新渲染
  >> 使用v-if
  >
  > 5、v-for 如何遍历数组的部分元素
  >> 使用过滤器
  ```
    this.data.filter((item)=>{
    	return item 条件
    })
  ```
  > 6、$router与$route的区别
  >> （1）$router是视图的内置对象，使用时无需this.其有go()方法
  >
  >> （2）$route是vue实例的内置对象，使用时需要this.$route，其有params属性对象
  >
  > 7、自定义全局变量
  >> （1）全局变量专用模块 -> 就是以一个特定模块来组织管理这些全局量，需要引用的地方导入该模块便好
  >
  >> （2）全局变量模块挂载到Vue.prototype 里 -> 在程序入口的main.js引入全局变量模块，添加下面代码
  ```
    import global_ from './components/tool/Global'
    Vue.prototype.GLOBAL = global_
  ```
  >
  >> 挂载之后，在需要引用全局量的模块处，不需再导入全局量模块，直接用this就可以引用了
  >
  > 8、for与forEach()的区别
  >> （1）for可以使用break跳出循环
  >
  >> （2）forEach()无法提前终止遍历
  >
  > 9、arr.filter()[0]与arr.filter()区别
  >> （1）arr.filter()[0]返回的是一个符合过滤条件的第一个数组元素，如下：
  ```
    let localObj = res.result.data.filter((localItem)=>{
        return localItem.title == item.title;
      })[0];
  ```
  >
  >> （2）arr.filter()返回的是一个包含所有符合过滤条件的元素的数组，如下：
  ```
    let rankList = rankSortArr.filter(function(item){
      return item.reading >= 10000;
    });
  ```
  >
  > 10、使用组件框架（如iView）时，其组件新定义的标签属性无法与Vue的动态数据绑定 -> 即vue实例的属性与方法统一放在原DOM标签元素内绑定！
  >
  > 11、搜索功能的实现，需要正则表达式里面添加变量，解决方法如下:
  ```
    let pat = eval("/" + self.searchMsg + "/ig");
    return pat.test(item.title);
  ```
  >
  > 12、实现图片的懒加载
  > 使用Vue-Lazyload插件 -> 参考：https://github.com/hilongjw/vue-lazyload
  >> （1）npm
  ```
    $ npm install vue-lazyload -D
  ```
  >
  >> （2）main.js
  ```
    import Vue from 'vue'
    import App from './App.vue'
    import VueLazyload from 'vue-lazyload'

    Vue.use(VueLazyload)

    // or with options
    Vue.use(VueLazyload, {
      preLoad: 1.3,
      error: require('./assets/img/failImg.jpg'),
      loading: require('./assets/img/lazyImg.gif'),
      attempt: 1,
      listenEvents: [ 'scroll', 'mousewheel' ]
    })

    new Vue({
      el: 'body',
      components: {
        App
      }
    })
  ```
  >> 特别注意：如果error和loading的地址为本地，需要加require('');
  >> （3）template
  ```
    <img :src="body.img" class="bookImg" /> -> <img v-lazy="body.img" class="bookImg" />
  ```
  >
  >> 注意，在template使用时，v-lazy属性值若为一个变量，则直接在""里写变量；若为一个定值，则需要在"''"添加单引号说明为字符串！

  ##    项目展示：
  > 创别书城 -> https://zhangfuyuan.github.io/chuangbie/

  * 注意：本人没有服务器，所以没有动态数据展示！！！