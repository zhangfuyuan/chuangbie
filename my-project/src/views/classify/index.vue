<template>
  <div class="classify">
    <div class="classify-topBar">
      <div class="classify-topNav">
        <div class="classify-topNav-left">
          <div class="classify-backBox" @click="$router.go(-1)">
            <Icon type="ios-arrow-back" color="#fff" size=32></Icon>
          </div>

          <div class="classify-titleBox">
            <span class="classify-title">分类页面</span>
          </div>
        </div>

        <div class="classify-topNav-right">
          <div class="classify-homeBox">
            <router-link exact to="/home"><Icon type="home" color="#fff" size=32></Icon></router-link>
          </div>

          <div class="classify-personalBox">
            <router-link exact to="/login"><Icon type="android-person" color="#fff" size=32></Icon></router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="classify-container">
      <ul>
        <li v-for="item in catalogList">
          <router-link exact :to="'/classifydetails/'+ item.id +'&'+ item.catalog" tag="a">{{item.catalog}}</router-link>
        </li>
      </ul>
    </div>

    <classify-footer></classify-footer>
  </div>
</template>

<script>
  import Footer from '@/components/Footer'

  var jsonp = require('jsonp');

  export default {
    name: 'classify',
    data () {
      return {
        catalogList: []
      }
    },
    components: {
      classifyFooter: Footer
    },
    created: function(){
      this.getCatalog();
    },
    methods: {
      getCatalog: function () {
        let self = this;
        jsonp('http://apis.juhe.cn/goodbook/catalog?dtype=&key=33045ad8111771bffe55d1310ff688a4', null, function (err, data) {
          if (err) {
            console.error(err.message);
          } else if (data.result == null) {
            console.log('超过每日请求次数！');
            self.getLocalCatalog().then(function(localCatalog){
              self.catalogList = localCatalog.result;
            }).catch(function(error){
              console.log(error);
            });
          } else {
            console.log('API请求数据成功！');
            self.catalogList = data.result;
          }
        });
      },
      getLocalCatalog: function (){
        return new Promise(function(success){
          jsonp('http://127.0.0.1:8089/vue/catalog.php', null, function (err, res) {
            if(err){
              console.error(err.message);
            }else {
              let localCatalog = JSON.parse(res);
              success(localCatalog);
            }
          });
        },function(fail){
          fail('获取本地书籍目录数据出错！');
        });
      }
    }
  }
</script>

<style scoped>
.classify-topBar, .classify-container {
  width: 100%;
  background-color: #fff;

}

.classify-topNav, .classify-container {
  display: flex;
  flex-direction: column;
}

.classify-topNav, .classify-topNav-left, .classify-topNav-right {
  display: flex;
  flex-direction: row;
}

.classify-topNav {
  justify-content: space-between;
  padding: .5rem 2rem .5rem 1rem;
  background-color: #007AFF;
}

span.classify-title {
  color: #fff;
  font-size: 20px;
  padding-left: 1rem;
}

.classify-homeBox {
  padding-right: 1.5rem;
}

.classify-container {
  margin-bottom: 1rem;
  padding: 1rem 0;
}

.classify-container ul {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.classify-container ul li {
  width: 100%;
  height: 3rem;
  border-bottom: 1px solid #f8f8f8;
}

.classify-container ul li a{
  display: block;
  width: 100%;
  height: 100%;
  line-height: 3rem;
  font-size: 1rem;
}

</style>
