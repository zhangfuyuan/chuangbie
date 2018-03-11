<template>
  <div class="recommendBox">
    <div class="titleBox">
      <div class="titleInfo">
        <Icon type="ios-star" color="#FFD700" size=20></Icon>
        <span class="titleTxt">精品推荐</span>
      </div>
    </div>

    <div class="recomBookBox" v-if="isShowRecom">
      <div class="recomBook-wrap">
        <router-link exact :to="'/bookdetails/' + recomArr[0].title +'&'+ recomCatalog"><img v-lazy="recomArr[0].img" class="recomBookImg" /></router-link>

        <div class="recomBookInfo">
          <p class="recomBook-title">{{recomArr[0].title}}</p>
          <p class="recomBook-catalog">分类：{{recomArr[0].catalog}}</p>
          <p class="recomBook-reading">人气：{{recomArr[0].reading}}</p>
          <p class="recomBook-sub2" v-html="recomArr[0].sub2"></p>
        </div>
      </div>

      <div class="recomBook-wrap">
        <router-link exact :to="'/bookdetails/' + recomArr[1].title +'&'+ recomCatalog"><img v-lazy="recomArr[1].img" class="recomBookImg" /></router-link>

        <div class="recomBookInfo">
          <p class="recomBook-title">{{recomArr[1].title}}</p>
          <p class="recomBook-catalog">分类：{{recomArr[1].catalog}}</p>
          <p class="recomBook-reading">人气：{{recomArr[1].reading}}</p>
          <p class="recomBook-sub2" v-html="recomArr[1].sub2"></p>
        </div>
      </div>
    </div>

    <div class="bottomBox">
      <span @click="changeRecom()">
        换一换
        <Icon type="android-refresh" size=12></Icon>
      </span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Iview from 'iview'
  Vue.use(Iview)
  var jsonp = require('jsonp');

  export default {
    name: 'recommend',
    data () {
      return {
        recomArr: [],
        recomCatalog: 0,
        isShowRecom: false,
        showImg: false
      }
    },
    created: function () {
     this.changeRecom();
    },
    methods: {
      changeRecom: function(){
        let ranNum = parseInt(Math.random()*17+242);
        this.recomCatalog = ranNum;
        let self = this;
        jsonp('http://apis.juhe.cn/goodbook/query?key=33045ad8111771bffe55d1310ff688a4&catalog_id='+ ranNum +'&pn=0&rn=2', null, function(err,res){
          if(err){
            console.error(err.message);
          }else if(res.result == null){
            console.log('超过每日请求次数！');
            self.getLocalData(ranNum).then(function(localData){
              self.recomArr = localData.result.data;
              self.isShowRecom = true;
            }).catch(function(error){
              console.log(error);
            });
          } else {
            console.log('API请求数据成功！');
            self.recomArr = res.result.data;
            let cutArr = res.result.data[1].sub2.split('<p>');
            let cutStr = '<p>' + cutArr[1];
            self.recomArr[1].sub2 = cutStr;
            self.isShowRecom = true;
          }
          //console.log(self.recomCatalog,self.recomArr);
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
      imgLoad: function(){
        this.showImg = true;
      },
      imgError: function(){
        this.showImg = false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.recommendBox {
  width: 100%;
  display: flex;
  background-color: #fff;
  margin-bottom: 1rem;
  font-size: 14px;
  padding: 1rem 1rem .5rem;
  flex-direction: column;
}

.recomBookBox {
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e2e2;
}

.recomBook-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 1rem;
}

.recomBookImg {
  width: 100px;
  height: 125px;
  //border: 1px solid red;
  cursor: pointer;
}

.recomBookInfo {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 1rem;
}

.recomBookInfo p {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 13px;
  text-align: left;
}

p.recomBook-title {
  font-size: 15px;
  padding-bottom: .4rem;
}

p.recomBook-sub2 {
  font-size: 12px;
  color: #7a7a7a;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

p.recomBook-sub2>p {
  display: none;
  background-color: red;
}

p.recomBook-sub2 p:first-of-type {
  display: block;
}

.titleBox {
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

.bottomBox {
  display: flex;
  justify-content: center;
  font-size: 12px;
  padding-top: .5rem;
  cursor: pointer;
}

.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}

@media (min-width: 768px) {
  .recommendBox {
    width: 80%;
    margin: 1rem auto;
  }
}
</style>
