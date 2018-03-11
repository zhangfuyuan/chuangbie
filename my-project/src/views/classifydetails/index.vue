<template>
  <div class="classifydetails">
    <div class="classifydetails-topBar">
      <div class="classifydetails-topNav">
        <div class="classifydetails-topNav-left">
          <div class="classifydetails-backBox" @click="$router.go(-1)">
            <Icon type="ios-arrow-back" color="#fff" size=32></Icon>
          </div>

          <div class="classifydetails-titleBox">
            <span class="classifydetails-title">{{$route.params.classifydetailsTitle}}</span>
          </div>
        </div>

        <div class="classifydetails-topNav-right">
          <div class="classifydetails-homeBox">
            <router-link exact to="/home"><Icon type="home" color="#fff" size=32></Icon></router-link>
          </div>

          <div class="classifydetails-personalBox">
            <router-link exact to="/login"><Icon type="android-person" color="#fff" size=32></Icon></router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="classifydetails-container">
      <ul>
        <li v-for="item in classifydetailsList">
          <div class="classifydetails-img">
            <router-link exact :to="'/bookdetails/' + item.title +'&'+ catalogId"><img :src="item.img" /></router-link>
          </div>

          <div class="classifydetails-info">
            <p class="classifydetails-title">{{item.title}}</p>
            <p class="classifydetails-sub1">{{item.sub1}}</p>
            <p class="classifydetails-sub2" v-html="'★简介★'+item.sub2"></p>
            <p class="classifydetails-subTag">
              <span class="classifydetails-tags">{{item.tags}}</span>
              <span class="classifydetails-reading">{{item.reading}}</span>
              <span class="classifydetails-bytime">{{item.bytime}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>

    <classifydetails-footer></classifydetails-footer>
  </div>
</template>

<script>
  var jsonp = require('jsonp');

  import Footer from '@/components/Footer'

  export default {
    name: 'classifydetails',
    data () {
      return {
        classifydetailsList: [],
        catalogId: this.$route.params.classifydetailsId
      }
    },
    created: function () {
      this.getAPIData();
    },
    methods: {
      getAPIData: function () {
        let self = this;
        jsonp('http://apis.juhe.cn/goodbook/query?key=33045ad8111771bffe55d1310ff688a4&catalog_id='+ self.$route.params.classifydetailsId +'&pn=0&rn=30', null, function (err, res) {
          if(err){
            console.error(err.message);
          }else if(res.result == null){
            console.log('超过每日请求次数！');
            self.getLocalData(self.$route.params.classifydetailsId).then(function(localData){
              self.classifydetailsList = localData.result.data;
              let cutArr = localData.result.data[1].sub2.split('<p>');
              let cutStr = '<p>' + cutArr[1];
              self.classifydetailsList[1].sub2 = cutStr;
            }).catch(function(error){
              console.log(error);
            })
          }else {
            console.log('API请求数据成功！');
            self.classifydetailsList = res.result.data;
            let cutArr = res.result.data[1].sub2.split('<p>');
            let cutStr = '<p>' + cutArr[1];
            self.classifydetailsList[1].sub2 = cutStr;
          }
        });
      },
      getLocalData: function(id) {
        let self = this;
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
      }
    },
    components: {
      classifydetailsFooter: Footer
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.classifydetails-topBar, .classifydetails-container {
  width: 100%;
  background-color: #fff;
  margin-bottom: 1rem;
}

.classifydetails-topNav, .classifydetails-container, .classifydetails-container ul {
  display: flex;
  flex-direction: column;
}

.classifydetails-topNav, .classifydetails-topNav-left, .classifydetails-topNav-right, .classifydetails-container ul li {
  display: flex;
  flex-direction: row;
}

.classifydetails-topNav {
  justify-content: space-between;
  padding: .5rem 2rem .5rem 1rem;
  background-color: #007AFF;
}

span.classifydetails-title {
  color: #fff;
  font-size: 20px;
  padding-left: 1rem;
}

.classifydetails-homeBox {
  padding-right: 1.5rem;
}

.classifydetails-container {
  width: 100%;
  padding: 1rem 0;
}

.classifydetails-container ul {
  width: 100%;
}

.classifydetails-container ul li {
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  flex-direction: row;
}

.classifydetails-img {
  flex: 3;
}

.classifydetails-img img {
  width: 100%;
  min-height: 125px;
}

.classifydetails-info {
  max-width: 243px;
  flex: 7;
  padding-left: .5rem;
}

.classifydetails-info p {
  text-align: left;
}

p.classifydetails-title {
  font-size: 1rem;
}

p.classifydetails-title, p.classifydetails-sub1, p.classifydetails-sub2 {
  margin-bottom: .5rem;
}

p.classifydetails-sub1, p.classifydetails-sub2 {
  font-size: 13px;
}

p.classifydetails-sub1, p.classifydetails-sub2, p.classifydetails-subTag {
  color: #999;
}

p.classifydetails-sub2 {
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

p.classifydetails-subTag {
  font-size: 10px;
}

p.classifydetails-subTag span {
  color: #007AFF;
  border-bottom: 1px solid #DCDCDC;
}

@media (min-width: 768px) {
  .classifydetails-container {
    width: 80%;
    margin: 0 auto 1rem;
  }

  .classifydetails-container ul li {
    justify-content: space-around;
  }

  .classifydetails-img {
    flex: none;
    width: 15%;
  }

  .classifydetails-info {
    flex: none;
    width: 85%;
  }

}

</style>
