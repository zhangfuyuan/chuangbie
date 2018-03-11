<template>
  <div class="content">
    <recommend></recommend>

    <div class="contentBox" v-for="cat,index in catalogArr" >
      <div class="titleBox">
        <div class="titleInfo">
          <Icon type="bookmark" color="#f96650" size=20 v-if="index%3==0"></Icon>
          <Icon type="bookmark" color="#789262" size=20 v-else-if="index%3==1"></Icon>
          <Icon type="bookmark" color="#276793" size=20 v-else></Icon>
          <span class="titleTxt">{{cat.catalog}}</span>
        </div>

        <div class="moreIcon">
          <router-link exact :to="'/classifydetails/'+ cat.id +'&'+ cat.catalog"><a href="javascript:void(0);" title="更多">
            <Icon type="ios-arrow-right" color="#808080" size=20></Icon>
          </a></router-link>
        </div>
      </div>

      <div class="containerBox">
        <div class="bookBox" v-for="body in catalogBody[cat.id]">
          <router-link exact :to="'/bookdetails/' + body.title +'&'+ cat.id"><img v-lazy="body.img" class="bookImg" /></router-link>
          <span>{{body.title}}</span>
        </div>
      </div>

      <div class="bottomBox">
        <router-link exact to="/classify" tag="p">
          查看更多
          <Icon type="ios-arrow-thin-right" size=12></Icon>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import Iview from 'iview'
  Vue.use(Iview)
  var jsonp = require('jsonp');

  import Recommend from '@/components/Recommend'

  export default {
    name: 'Content',
    data: function () {
      return {
        aa: 66,
        catalogArr: [],
        catalogBody: {242: [],243: [],244: [],245: [],246: [],247: [],248: [],249: [],250: [],251: [],252: [],253: [],254: [],255: [],256: [],257: [],258: []}
      }
    },
    created: function () {
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
              self.catalogArr = localCatalog.result;
              self.catalogArr.forEach(function(item,index){
                self.getLocalData(item.id).then(function(localData){
                  self.catalogBody[item.id] = localData.result.data;
                }).catch(function(error){
                  console.log(error);
                });
              });
              //console.log(self.catalogBody);
            }).catch(function(error){
              console.log(error);
            });
          } else {
            console.log('API请求数据成功！');
            self.catalogArr = data.result;
            self.catalogArr.forEach(function(item,index){
              self.getAPIData(item.id).then(function(APIData){
                self.catalogBody[item.id] = APIData.result.data;
              }).catch(function(error){
                console.log(error);
              })
            })
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
      },
      getLocalData: function (id){
        return new Promise(function(success){
          jsonp('http://127.0.0.1:8089/vue/'+ id +'-6p.php', null, function (err, res) {
            if(err){
              console.error(err.message);
            }else {
              let localData = JSON.parse(res);
              success(localData);
            }
          });
        },function(fail){
          fail('获取本地书籍详情数据出错！');
        });
      },
      getAPIData: function (id){
       return new Promise(function(success){
         jsonp('http://apis.juhe.cn/goodbook/query?key=33045ad8111771bffe55d1310ff688a4&catalog_id='+ id +'&pn=0&rn=6', null, function (err, res) {
           if(err){
             console.error(err.message);
           }else {
             success(res);
           }
         });
       },function(fail){
         fail('获取本地书籍详情数据出错！');
       });
      }
    },
    components: {
      recommend: Recommend
    }
  }
</script>


<style scoped>
.contentBox {
  width: 100%;
  display: flex;
  background-color: #fff;
  margin-bottom: 1rem;
  font-size: 14px;
  padding: 1rem 1rem .5rem;
  flex-direction: column;
}

.titleBox, .containerBox,.bottomBox {
  width: 100%;
  display: flex;
}

.titleBox {
  justify-content: space-between;
  align-items: center;
}

.titleInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
}

span.titleTxt {
  font-size: 16px;
  padding-left: 5px;
  cursor: pointer;
}

.containerBox {
  flex-direction: column;
  border-bottom: 1px solid #e2e2e2;
  padding-top: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.bookBox {
  width: 100px;
  font-size: 13px;
  margin-bottom: 1rem;
}

.bookImg {
  width: 100%;
  height: 125px;
  //border: 1px solid red;
  cursor: pointer;
}

.bottomBox {
  display: flex;
  justify-content: center;
  font-size: 12px;
  padding-top: .5rem;
  cursor: pointer;
}

@media (min-width: 768px) {
  .contentBox {
    width: 80%;
    margin: 1rem auto;
  }
}

</style>
