# chuangbie

	���������Ŀ

#   ��Ŀ��������
  ##    ��һ������ʼ����������
  > 1���ų�node_modules�ļ�����
  >
  > 2����չ�ļ�.css��׺ʡ������
  >
  > 3��ע���Զ��������ʽ����
  >
  > 4��·��ģʽ���ó�history

  ##  �ڶ�������װ����������ʹ�õ�������
  > 1��UI��� ���� iView + swiper
  ```
  $ npm install iview --save
  $ npm install vue-awesome-swiper --save
  ```
  >
  > 2��ģ����� ���� axios
  ```
  $ npm i axios -D
  $ npm i vue-axios -D
  ```

  ##    �����������������������ļ�
  > 1��@/views�ļ�������ҳ����ͣ�
  >> home����ҳҳ�棩
  >> classify������ҳ�棩
  >> rank������ҳ�棩
  >> women��Ů��ҳ�棩
  >> men������ҳ�棩
  >> booklist���鵥ҳ�棩
  >
  > 2��@/components�ļ���ҳ��ģ�������
  >> Topbar.vue�����������
  >> Footer.vue��ҳ�������

  ##    ���Ĳ�����ɻ���ҳ���·�ɷ���
  > 1�������·��ҳ��
  >
  > 2������'/home'·��ҳ��
  >
  > 3����������·��ҳ��
  >
  > 4������'*'û��ָ��·���ĳ������ҳ��

  ##    ���岽�����ģ������ͻ���ҳ�沼������ʽ
  > 1����ɶ�����Swiper��ҳ�ŵ�ģ��������ֺ���ʽ
  >> Swiper��1�����´������д��home/index.vue�ļ�����
  ```
    import Vue from 'vue'
    import VueAwesomeSwiper from 'vue-awesome-swiper'
    Vue.use(VueAwesomeSwiper)
  ```
  >> Swiper��2���޷��Զ��л��ֲ�ͼ���������������swiper.js�ļ��޸�autoplayDisableOnInteraction���� true -> false
  ```
    autoplayDisableOnInteraction: false,
  ```
  >
  > 2��
  >
  > ����������Ŀӣ�
  >> ��1���Զ��������Ԫ�ر�ǩ��������HTML���еı�ǩ���ظ�
  >> ��2�����ʹ���ܽ᣺�����õ�����������ĸ�vueģ���������������
  >>

  ##    ��������Ϊǰ����������λ��ע��API����
  >
  >
  > ����������Ŀӣ�
  >> ��1��axios�޷������������
  >
  >> ��2��JSON���Խ���������⣬��ʹ��ʱ�ر�ע��this�ض����Լ���ʹ���������JSONPģ��

  ##    ��Ŀ���ע������
  > 1����Ŀ¼��·������ -> ��������config/index.js/assetsPublicPath���Ը�Ϊ��./��
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
  > 2��·��ģʽ����Ϊ"history"
  ```
    export default new Router({
      //mode: 'history',
      ...
    })
  ```
  >
  > 3������ͼƬ·������
  >> ����·���Զ�̬·��д�ڱ�ǩ������
  ```
    :style="{ backgroundImage: 'url(' + bg + ')'}"
  ```
  >> ����·���Ա���д��vueʵ����data������
  ```
    data: function(){
      return {
        bg: require('../../assets/img/router.png')
      }
    }
  ```
  >
  > 4��UI�������·������ -> ���ݴ����·�����½��ļ��У������嶪��ȥ
  >> ·���ظ���������
  ```
    swiper.js:4928GET file:///E:/web/project/zhuliu/my-project/dist/static/css/static/fonts/ionicons.24712f6.ttf net::ERR_FILE_NOT_FOUNDcss @ swiper.js:4928t @ swiper.js:470o @ app.67e006f��.js:406e @ swiper.vue:62mounted @ app.67e006f��.js:411Me @ vue.esm.js:2646insert @ vue.esm.js:3501S @ vue.esm.js:5440e.nodeOps @ vue.esm.js:5610e._update @ vue.esm.js:2395i @ vue.esm.js:2519Ha.get @ vue.esm.js:2862Ha @ vue.esm.js:2851_e @ vue.esm.js:2523xt.$mount @ vue.esm.js:7842xt.$mount @ vue.esm.js:10045e._init @ vue.esm.js:4207xt @ vue.esm.js:4292(anonymous function) @ main.js:33n @ bootstrap 561b45d��:54window.webpackJsonp @ bootstrap 561b45d��:25(anonymous function) @ app.67e006f��.js:1
    index.html:1 GET file:///E:/web/project/zhuliu/my-project/dist/static/css/static/fonts/ionicons.05acfdb.woff net::ERR_FILE_NOT_FOUND
  ```
  >> �½�static/fonts�ļ��У������޷��ҵ��ļ�·���Ĵ���
  ```
    static/css/static/fonts/ionicons.24712f6.ttf
    static/css/static/fonts/ionicons.05acfdb.woff
  ```

  ##    ����������Ҫ��������⼯�ϣ�
  > 1����������⡾���·���ʵ�ⲻ�С�
  >> ʹ��api����config/index.js -> dev.proxyTable: {}��
```
    proxyTable: {
        '/api/**': {
        target: 'http://127.0.0.1:8089', // ��ӿڵ�����
        secure: false,      // �����https�ӿڣ���Ҫ�����������
        changeOrigin: true,     // ����ӿڿ�����Ҫ���������������
      },
      '/users/*':{
        target:'http://127.0.0.1:8089'
      }
    },
```
  >> ����ʱ·��Ҫ�� '/���õĴ�����/'
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
  > 2������������ڸ������ʹ��
  >
  > 3��API�������ݵ�ַ��صĹ���
  >
  > 4��v-for �б����ݻ�ȡ������������Ⱦ
  >> ʹ��v-if
  >
  > 5��v-for ��α�������Ĳ���Ԫ��
  >> ʹ�ù�����
  ```
    this.data.filter((item)=>{
    	return item ����
    })
  ```
  > 6��$router��$route������
  >> ��1��$router����ͼ�����ö���ʹ��ʱ����this.����go()����
  >
  >> ��2��$route��vueʵ�������ö���ʹ��ʱ��Ҫthis.$route������params���Զ���
  >
  > 7���Զ���ȫ�ֱ���
  >> ��1��ȫ�ֱ���ר��ģ�� -> ������һ���ض�ģ������֯������Щȫ��������Ҫ���õĵط������ģ����
  >
  >> ��2��ȫ�ֱ���ģ����ص�Vue.prototype �� -> �ڳ�����ڵ�main.js����ȫ�ֱ���ģ�飬����������
  ```
    import global_ from './components/tool/Global'
    Vue.prototype.GLOBAL = global_
  ```
  >
  >> ����֮������Ҫ����ȫ������ģ�鴦�������ٵ���ȫ����ģ�飬ֱ����this�Ϳ���������
  >
  > 8��for��forEach()������
  >> ��1��for����ʹ��break����ѭ��
  >
  >> ��2��forEach()�޷���ǰ��ֹ����
  >
  > 9��arr.filter()[0]��arr.filter()����
  >> ��1��arr.filter()[0]���ص���һ�����Ϲ��������ĵ�һ������Ԫ�أ����£�
  ```
    let localObj = res.result.data.filter((localItem)=>{
        return localItem.title == item.title;
      })[0];
  ```
  >
  >> ��2��arr.filter()���ص���һ���������з��Ϲ���������Ԫ�ص����飬���£�
  ```
    let rankList = rankSortArr.filter(function(item){
      return item.reading >= 10000;
    });
  ```
  >
  > 10��ʹ�������ܣ���iView��ʱ��������¶���ı�ǩ�����޷���Vue�Ķ�̬���ݰ� -> ��vueʵ���������뷽��ͳһ����ԭDOM��ǩԪ���ڰ󶨣�
  >
  > 11���������ܵ�ʵ�֣���Ҫ������ʽ������ӱ����������������:
  ```
    let pat = eval("/" + self.searchMsg + "/ig");
    return pat.test(item.title);
  ```
  >
  > 12��ʵ��ͼƬ��������
  > ʹ��Vue-Lazyload��� -> �ο���https://github.com/hilongjw/vue-lazyload
  >> ��1��npm
  ```
    $ npm install vue-lazyload -D
  ```
  >
  >> ��2��main.js
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
  >> �ر�ע�⣺���error��loading�ĵ�ַΪ���أ���Ҫ��require('');
  >> ��3��template
  ```
    <img :src="body.img" class="bookImg" /> -> <img v-lazy="body.img" class="bookImg" />
  ```
  >
  >> ע�⣬��templateʹ��ʱ��v-lazy����ֵ��Ϊһ����������ֱ����""��д��������Ϊһ����ֵ������Ҫ��"''"��ӵ�����˵��Ϊ�ַ�����

  ##    ��Ŀչʾ��
  > ������� -> https://zhangfuyuan.github.io/chuangbie/

  * ע�⣺����û�з�����������û�ж�̬����չʾ������