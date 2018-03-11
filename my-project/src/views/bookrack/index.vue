<template>
  <div class="bookrack">
    <div class="bookrack-topBar">
      <div class="bookrack-topNav">
        <div class="bookrack-topNav-left">
          <div class="bookrack-backBox" @click="$router.go(-1)">
            <Icon type="ios-arrow-back" color="#fff" size=32></Icon>
          </div>

          <div class="bookrack-titleBox">
            <span class="bookrack-title">我的书架</span>
          </div>
        </div>

        <div class="bookrack-topNav-right">
          <div class="bookrack-homeBox">
            <router-link exact to="/home"><Icon type="home" color="#fff" size=32></Icon></router-link>
          </div>

          <div class="bookrack-personalBox">
            <router-link exact to="/login"><Icon type="android-person" color="#fff" size=32></Icon></router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="bookrack-container">
      <ul v-if="bookDetailList.length>0">
        <li v-for="item in bookDetailList">
          <router-link exact :to="'/bookdetails/' + item.title +'&'+ item.catalogId"><img :src="item.img" /></router-link>
          <span>{{item.title}}</span>
        </li>
      </ul>

      <div v-if="bookDetailList.length==0">
        书架还没有东西
        <router-link to="/home"><a href="javascript:void(0);" >去书城逛逛</a></router-link>
      </div>
    </div>

    <div class="clearBookrack">
      <a href="javascript:void(0);" @click="clearBookrack();$router.go(0)">一键清空书架</a>
    </div>

    <recommend></recommend>

    <bookrack-footer></bookrack-footer>
  </div>
</template>

<script>
  import Recommend from '@/components/Recommend'
  import Footer from '@/components/Footer'

  var jsonp = require('jsonp');

  export default {
    name: 'bookrack',
    data () {
      return {
        bookrackList: this.MyGlobal.bookrackList.list,
        bookDetailList: []
      }
    },
    components: {
      recommend: Recommend,
      bookrackFooter: Footer
    },
    created: function(){
      this.getDetail();
    },
    methods: {
      getDetail: function(){
        let self = this;
        if(this.bookrackList.length == 0){
          return;
        }
        this.bookrackList.forEach(function(item, index){
          jsonp('http://apis.juhe.cn/goodbook/query?key=33045ad8111771bffe55d1310ff688a4&catalog_id='+ item.catalog +'&pn=0&rn=30', null, function(err, res) {
            if(err){
              console.error(err.message);
            } else if(res.result == null){
              console.log('超出每日请求次数！');
              self.getLocalData(item.catalog).then(function(localData){
                let localObj = localData.result.data.filter((localItem)=>{
                  return localItem.title == item.title;
                })[0];
                localObj.catalogId = item.catalog;
                self.bookDetailList.push(localObj);
              }).catch(function(error){
                console.log(error);
              })
            } else {
              console.log('请求API成功！');
              let localObj = res.result.data.filter((localItem)=>{
                return localItem.title == item.title;
              })[0];
              localObj.catalogId = item.catalog;
              self.bookDetailList.push(localObj);
            }
          });
        })
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
      clearBookrack: function(){
        let clearList = [];
        this.MyGlobal.bookrackList.list = clearList;
        this.bookrackList = clearList;
        localStorage.setItem('books',JSON.stringify(this.MyGlobal.bookrackList));
      }
    },
    watch: {
      bookrackList: function(){

      }
    }
  }
</script>

<style scoped>
.bookrack-topBar, .bookrack-container {
  width: 100%;
  background-color: #fff;
}

.bookrack-topNav, .bookrack-container {
  display: flex;
  flex-direction: column;
}

.bookrack-topNav, .bookrack-topNav-left, .bookrack-topNav-right {
  display: flex;
  flex-direction: row;
}

.bookrack-topNav {
  justify-content: space-between;
  padding: .5rem 2rem .5rem 1rem;
  background-color: #007AFF;
}

span.bookrack-title {
  color: #fff;
  font-size: 20px;
  padding-left: 1rem;
}

.bookrack-homeBox {
  padding-right: 1.5rem;
}

.bookrack-container {
  margin-bottom: 1rem;
  padding: 2rem 0 1rem;
}

.bookrack-container ul {
  display: flex;
  flex-direction:row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.bookrack-container ul li {
  width: 100px;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.bookrack-container ul li img {
  width: 100%;
  height: 135px;
  margin-bottom: .5rem;
}

.bookrack-container ul li span {
  font-size: 13px;
}

.clearBookrack {
  width: 80%;
  margin: 0 auto 1rem;
}

.clearBookrack a {
  display: block;
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #007AFF;
  border-radius: 5px;
  box-shadow: 3px 3px 2px #e2e2e2;
}
</style>
