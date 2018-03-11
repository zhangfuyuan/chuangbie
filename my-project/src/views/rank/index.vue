<template>
  <div class="rank">
    <div class="classify-topBar">
      <div class="classify-topNav">
        <div class="classify-topNav-left">
          <div class="classify-backBox" @click="$router.go(-1)">
            <Icon type="ios-arrow-back" color="#fff" size=32></Icon>
          </div>

          <div class="classify-titleBox">
            <span class="classify-title">排行页面</span>
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

    <div class="rank-container">
      <ul>
        <li v-for="item in rankSort" >
          <router-link exact :to="'/bookdetails/'+ item.title +'&'+ item.id" tag="a"><img :src="item.img" /></router-link>
          <p>{{item.title}}</p>
          <p>人气:{{item.reading}}</p>
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
    name: 'rank',
    data () {
      return {
        rankList: [],
        catalogId: []
      }
    },
    components: {
      classifyFooter: Footer
    },
    created: function(){
      this.getCatalogArr();
      this.getAPIData();
    },
    methods: {
      getCatalogArr: function(){
        for(var i=242; i<=258; i++){
          this.catalogId.push(i);
        }
      },
      getAPIData: function () {
        let self = this;
        this.catalogId.forEach(function(id,index){
          jsonp('http://apis.juhe.cn/goodbook/query?key=33045ad8111771bffe55d1310ff688a4&catalog_id='+ id +'&pn=0&rn=6', null, function (err, data) {
            if (err) {
              console.error(err.message);
            } else if (data.result == null) {
              console.log('超过每日请求次数！');
              self.getLocalData(id).then(function(localCatalog){
                localCatalog.result.data.forEach(function(item, index){
                  item.id = id;
                  self.rankList.push(item);
                });
              }).catch(function(error){
                console.log(error);
              });
            } else {
              console.log('API请求数据成功！');
              data.result.data.forEach(function(item, index){
                self.rankList.push(item);
              });
            }
          });
        });
      },
      getLocalData: function (id){
        return new Promise(function(success){
          jsonp('http://127.0.0.1:8089/vue/'+ id +'-6p.php', null, function (err, res) {
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
    },
    computed: {
      rankSort: function(){
        function compare(property){
          return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
          }
        }
        this.rankList.forEach(function(item, index, arr){
          item.reading = item.reading.replace(/人阅读/,'');
        });
        for(var i=0; i<this.rankList.length-1; i++){
          let title = this.rankList[i].title;
          let nextTitle = this.rankList[i+1].title;
          if( title == nextTitle ){
            this.rankList.splice(i,1);
          }
        }
        let rankSortArr = this.rankList.sort(compare('reading')).reverse();
        return rankSortArr.filter(function(item){
          return item.reading >= 10000;
        });

      }
    }
  }
</script>

<style scoped>
.classify-topBar, .rank-container {
  width: 100%;
  background-color: #fff;
  margin-bottom: 1rem;
}

.classify-topNav {
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

.rank-container {
  padding: 1rem;
}

.rank-container ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.rank-container ul li {
  width: 100px;
  display: flex;
  flex-direction: column;
  padding: 2rem 0 .5rem;
  border-bottom: 1px solid #007AFF;
}

.rank-container ul li img{
  width: 100%;
  min-height: 125px;
  height: auto;
}

.rank-container ul li p:first-of-type {
  width: 100%;
  font-size: 13px;
  padding-top: .5rem;
}

.rank-container ul li p:nth-of-type(2) {
  width: 100%;
  font-size: 10px;
}

</style>
