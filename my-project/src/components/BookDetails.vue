<template>
  <div class="bookDetails">
    <div class="bookDetails-topBar">
      <div class="bookDetails-topNav">
        <div class="bookDetails-topNav-left">
          <div class="bookDetails-backBox" @click="$router.go(-1)">
            <Icon type="ios-arrow-back" color="#fff" size=32></Icon>
          </div>

          <div class="bookDetails-titleBox">
            <span class="bookDetails-title">作品详情</span>
          </div>
        </div>

        <div class="bookDetails-topNav-right">
          <div class="bookDetails-homeBox">
            <router-link exact to="/home"><Icon type="home" color="#fff" size=32></Icon></router-link>
          </div>

          <div class="bookDetails-personalBox">
            <router-link exact to="/login"><Icon type="android-person" color="#fff" size=32></Icon></router-link>
          </div>
        </div>
      </div>

      <div class="bookDetails-subNav">
        <ul>
          <li class="bookDetails-introBtn">
            <a href="javascript:void(0);" @click="changeShowIntro()">作品简介</a>
          </li>

          <li class="bookDetails-detailsBtn">
            <a href="javascript:void(0);" @click="changeShowDetails()">内容详情</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="bookDetails-container">
      <div class="bookDetails-containerInfo">
        <div class="bookDetails-showIntro" v-if="showIntro">
          <div class="bookDetails-imgBox">
            <img :src="bookDetail.img" />
          </div>

          <div class="bookDetails-bookIntro">
            <p class="bookDetail-titleTxt"> {{bookDetail.title}} </p>
            <p class="bookDetail-catalogTxt"> {{bookDetail.catalog}} </p>
            <p class="bookDetail-tagsTxt"> {{bookDetail.tags}} </p>
            <p class="bookDetail-sub1Txt"> {{bookDetail.sub1}} </p>
            <p class="bookDetail-readingTxt"> 人气：{{bookDetail.reading}} </p>
            <p class="bookDetail-bytimeTxt"> 时间：{{bookDetail.bytime}} </p>
          </div>
        </div>

        <div class="bookDetails-showDetails" v-if="showDetails">
           <p class="bookDetail-sub2Txt" v-html="bookDetail.sub2"></p>
        </div>
      </div>

      <div class="container-link">
        <ul>
          <li v-for="linkItem in linkList">
            <a :href="linkItem.link"> {{linkItem.linkName}} </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="addBookrack">
      <a href="javascript:void(0);" class="addBookrackBtn" @click="addBookrack()">加入书架</a>
    </div>

    <recommend></recommend>

    <bookDetails-footer></bookDetails-footer>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Iview from 'iview'
  Vue.use(Iview)
  var jsonp = require('jsonp');

  import Recommend from '@/components/Recommend'
  import Footer from '@/components/Footer'

  export default {
    name: 'bookDetails',
    data () {
      return {
        showIntro: true,
        showDetails: false,
        bookDetail: {},
        linkList: []
      }
    },
    created: function(){
      this.getDetail();
    },
    watch: {
      $route () {
        this.getDetail();
      }
    },
    methods: {
      getDetail: function(){
        let routerTitle = this.$route.params.title;
        let self = this;
        jsonp('http://apis.juhe.cn/goodbook/query?key=33045ad8111771bffe55d1310ff688a4&catalog_id='+ self.$route.params.catalogId +'&pn=0&rn=30', null, function(err, res) {
          if(err){
            console.error(err.message);
          } else if(res.result == null){
            console.log('超出每日请求次数！');
            self.getLocalData(self.$route.params.catalogId).then(function(localData){
              self.bookDetail = localData.result.data.filter((item)=>{
                return item.title == routerTitle;
              })[0];
              self.getLink();
            }).catch(function(error){
              console.log(error);
            })
          } else {
            console.log('请求API成功！');
            self.bookDetail = res.result.data.filter((item)=>{
              return item.title == routerTitle;
            })[0];
            self.getLink();
          }
        });
      },
      getLink: function(){
        this.linkList = [];
        let linkStr = this.bookDetail.online;
        let linkArr = linkStr.split(' ');
        var self = this;
        linkArr.forEach(function(item, index){
          let obj = {};
          let arr = item.split(':');
          obj.linkName = arr[0];
          obj.link = arr[1] + ':' + arr[2];
          self.linkList.push(obj);
        });
      },
      changeShowIntro: function(){
        this.showIntro = true;
        this.showDetails = false;
      },
      changeShowDetails: function(){
        this.showIntro = false;
        this.showDetails = true;
      },
      getLocalData: function (id){
        return new Promise(function(success){
          jsonp('http://127.0.0.1:8089/vue/'+ id +'-10p.php', null, function (err, res) {
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
      addBookrack: function(){
        if(localStorage.getItem('books') == null){
          this.MyGlobal.bookrackList = { "list": [] };
          let addObj = { "catalog": this.$route.params.catalogId, "title": this.$route.params.title };
          this.MyGlobal.bookrackList.list.push(addObj);
          localStorage.setItem('books',JSON.stringify(this.MyGlobal.bookrackList));
          this.$Message.info('已成功加入书架！');
        }else {
          let localArr = this.MyGlobal.bookrackList.list;
          let canStorage = true;
          for(var i=0; i<localArr.length; i++){
            if(localArr[i].title == this.$route.params.title){
              canStorage = false;
              break;
            }
          }
          if(canStorage){
            let addObj = { "catalog": this.$route.params.catalogId, "title": this.$route.params.title };
            this.MyGlobal.bookrackList.list.push(addObj);
            localStorage.setItem('books',JSON.stringify(this.MyGlobal.bookrackList));
            this.$Message.info('已成功加入书架！');
          }else {
            this.$Message.info('书架已存在此书<p style="text-indent:2em;">请勿重复添加！</p>');
          }
        }

      }
    },
    components: {
      recommend: Recommend,
      bookDetailsFooter: Footer
    }
  }
</script>

<style scoped>
.bookDetails-topBar, .bookDetails-container {
  width: 100%;
  background-color: #fff;
  margin-bottom: 1rem;
}

.bookDetails-topBar, .bookDetails-container, .bookDetails-containerInfo, .bookDetails-bookIntro {
  display: flex;
  flex-direction: column;
}

.bookDetails-topNav, .bookDetails-subNav>ul, .bookDetails-topNav-left, .bookDetails-topNav-right, .bookDetails-showIntro, .bookDetails-showIntro, .container-link>ul {
  display: flex;
  flex-direction: row;
}

.bookDetails-topNav {
  justify-content: space-between;
  padding: .5rem 2rem .5rem 1rem;
  background-color: #007AFF;
}

span.bookDetails-title {
  color: #fff;
  font-size: 20px;
  padding-left: 1rem;
}

.bookDetails-homeBox {
  padding-right: 1.5rem;
}

.bookDetails-subNav>ul li {
  width: 50%;
  height: 2.5rem;
  box-sizing: border-box;
  border: 1px solid #e2e2e2;
}

.bookDetails-subNav>ul li {
  border-left: 0;
}

.bookDetails-subNav>ul li:last-of-type {
  border-right: 0;
}

.bookDetails-subNav>ul li a {
  display: block;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  line-height: 2rem;
}
.bookDetails-subNav>ul li:last-of-type a {
  color: #000;
}

.bookDetails-showIntro {
  width: 100%;
  padding: 1rem;
}

.bookDetails-imgBox {
  flex: 4;
}

.bookDetails-imgBox>img {
  width: 100%;
}

.bookDetails-bookIntro {
  flex: 6;
}

.bookDetails-bookInt {

}

.bookDetails-bookIntro p{
  padding-left: 1rem;
  text-align: left;
  margin-bottom: 2px;
}

p.bookDetail-titleTxt {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: .5rem;
}

p.bookDetail-sub1Txt {
  margin-bottom: .5rem;
}

p.bookDetail-catalogTxt, p.bookDetail-tagsTxt, p.bookDetail-sub1Txt, p.bookDetail-readingTxt, p.bookDetail-bytimeTxt {
  font-size: 14px;
}

p.bookDetail-readingTxt, p.bookDetail-bytimeTxt {
  font-size: 12px;
  color: #7a7a7a;
}

.bookDetails-showDetails {
  width: 100%;
}

p.bookDetail-sub2Txt {
  padding: 1rem;
  font-size: 1rem;
  text-align: left;
  text-indent: 2em;
}

.container-link {
  width: 100%;
  padding-top: 1rem;
}

.container-link ul {
  width: 100%;
}

.container-link ul li {
  flex: 1;
  height: 3rem;
  box-sizing: border-box;
  border: 1px solid #e2e2e2;
}

.container-link ul li {
  border-left: 0;
}

.container-link ul li:last-of-type {
  border-right: 0;
}

.container-link ul li a {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 3rem;
  font-size: 1rem;
  color: #007AFF;
}

.addBookrack {
  width: 80%;
  margin: 0 auto 1rem;
}

a.addBookrackBtn {
  display: block;
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  border-radius: 5px;
  box-shadow: 3px 3px 2px #e2e2e2;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #007AFF;
}

@media (min-width: 768px) {
  .bookDetails-topBar, .bookDetails-container {
    width: 80%;
    margin: 0 auto 1rem;
  }
  .addBookrack {
    width: 60%;
    margin: 1rem auto;
  }
  .bookDetails-imgBox {
    flex: 2;
  }

  .bookDetails-imgBox>img {
    width: 100%;
  }

  .bookDetails-bookIntro {
    flex: 8;
  }
}

</style>
