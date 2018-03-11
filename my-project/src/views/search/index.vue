<template>
  <div class="search">
    <div class="search-header">
      <div class="search-headerBack" @click="$router.go(-1)">
        <Icon type="ios-arrow-back" color="#fff" size=32></Icon>
      </div>

      <div class="search-headerTitle">
        <span>搜索中心</span>
      </div>

      <div class="search-headerHome">
        <router-link exact to="/home"><Icon type="home" color="#fff" size=32></Icon></router-link>
      </div>
    </div>

    <div class="search-searchBox">
      <label for="searchBox"><Icon type="android-search" size=22 color="#007AFF" class="searchIcon"></Icon></label>
      <input type="text" id="searchBox" placeholder="书名/作者/关键词" v-model.trim="searchMsg" @input="getSearch()" />
      <a href="javascript:void(0);" class="closeIcon" v-show="showCloseIcon" @click="clearSearchMsg()"><Icon type="ios-close-outline" size=18 ></Icon></a>
    </div>

    <div class="search-container">
      <div class="recomSearch" v-if="showRecomSearch">
        <ul>
          <li v-for="item in recomSearchArr">
            <router-link exact :to="'/bookdetails/' + item.title +'&'+ item.id" tag="a">{{item.title}}</router-link>
          </li>
        </ul>
      </div>

      <div class="searchList" v-if="showSearchList">
        <ul>
          <li v-for="item in handleSearchListArr" @click="showSearchData(item.title)">
            {{item.title}}
          </li>
          <li v-if="handleSearchListArr.length==0" style="justify-content: center;">无搜索结果！</li>
        </ul>
      </div>

      <div class="searchResult" v-if="showSearchResult">
        <ul>
          <li v-for="item in searchResultArr">
            <router-link exact :to="'/bookdetails/' + item.title +'&'+ item.id" class="searchResult-img"><img :src="item.img" /></router-link>
            <span>{{item.title}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="search-history" v-if="searchHistoryList.length>0">
      <div class="search-historyHeader">
        <span class="search-historyTitle">搜索历史</span>
        <span class="search-historyDelBtn" @click="clearHistory()">
          <Icon type="trash-a" size=30 ></Icon>
        </span>
      </div>

      <div class="search-historyContent">
        <ul>
          <li v-for="item in searchHistoryList" @click="showSearchData(item)" >
            {{item}}
          </li>
        </ul>
      </div>
    </div>

    <search-footer></search-footer>
  </div>
</template>

<script>
  import Footer from '@/components/Footer'

  var jsonp = require('jsonp');

  export default {
    name: 'search',
    data () {
      return {
        searchMsg: '',
        showCloseIcon: false,
        showRecomSearch: true,
        showSearchList: false,
        showSearchResult: false,
        searchListArr: [],
        searchResultArr: [],
        searchHistoryList: [],
        recomSearchArr:
          [
            { title: "微观历史", id: "242" },
            { title: "舞遍全球", id: "252" },
            { title: "王子与贫儿", id: "244" },
            { title: "明朝那些事儿", id: "248" },
            { title: "爱的艺术", id: "257" },
            { title: "与狼共舞", id: "243" },
            { title: "许愿树", id: "251" },
            { title: "浮沉", id: "255" },
            { title: "梁山政治", id: "254" }
          ],
        rankList: [],
        catalogId: []
      }
    },
    components: {
      searchFooter: Footer
    },
    created: function(){
      this.getCatalogArr();
      this.getAPIData();
    },
    methods: {
      getSearch: function(){
        if(this.searchMsg){
          let self = this;
          this.searchListArr = this.rankList.filter(function(item){
              let pat = eval("/" + self.searchMsg + "/ig");
              return pat.test(item.title) || pat.test(item.sub1);
          })
        }
        this.showCloseIcon = true;
        this.showSearchList = true;
        this.showRecomSearch = false;
      },
      clearSearchMsg: function(){
        this.searchMsg = '';
        this.showCloseIcon = false;
        this.showSearchList = false;
        this.showRecomSearch = true;
      },
      showSearchData: function(search){
        this.searchHistoryList.push(search);
        this.searchResultArr = this.handleSearchListArr.filter(function(item){
          return item.title == search;
        });
        this.showRecomSearch = false;
        this.showSearchList = false;
        this.showSearchResult = true;
      },
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
        for(var i=0; i<this.rankList.length-1; i++){
          let title = this.rankList[i].title;
          let nextTitle = this.rankList[i+1].title;
          if( title == nextTitle ){
            this.rankList.splice(i,1);
          }
        }
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
      },
      clearHistory: function(){
        this.searchHistoryList = [];
      }
    },
    computed: {
      handleSearchListArr: function(){
        for(let i=0; i<this.searchListArr.length-1; i++){
          let title = this.searchListArr[i].title;
          let nextTitle = this.searchListArr[i+1].title;
          if( title == nextTitle ){
            this.searchListArr.splice(i,1);
          }
        }
        return this.searchListArr;
      }
    }
  }

</script>

<style scoped>
.search-header, .search-container, .search-history  {
  width: 100%;
  margin-bottom: 1rem;
  background-color: #fff;
}

.search-header {
  display: flex;
  background-color: #007AFF;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: .5rem 1rem;
}

.search-headerTitle span {
  color: #fff;
  font-size: 20px;
}

.search-searchBox {
  width: 80%;
  height: 3rem;
  margin: 0 auto 1rem;
  background-color: #fff;
  border-radius: 5xp;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 1rem;
  border: 1px solid #e2e2e2;
  padding-left: 1rem;
  position: relative;
}

.search-searchBox .searchIcon {
  line-height: 3rem;
}

.search-searchBox input {
  border: 0;
  outline: none;
  text-indent: 1rem;
  line-height: 3rem;
}

.search-searchBox .closeIcon {
  line-height: 3rem;
  position: absolute;
  right: 1rem;
}

.search-container {

}

.recomSearch {
  width: 100%;
}

.recomSearch ul {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 1rem;
}

.searchList ul {
  width: 100%;
  height: 12rem;
  overflow: auto;
}

.searchList ul li {
  display: flex;
  justify-content: flex-start;
  padding: 0 1rem;
  border-bottom: 1px solid #f3f3f3;
  line-height: 3rem;
  font-size: 1rem;
}

.searchResult {
  width: 100%;
  padding: 1rem;
}

.searchResult ul {
  display: flex;
  flex-direction: column;
}

.searchResult ul li {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 1px solid #f3f3f3;
  margin-bottom: 1rem;
  padding: 1rem 0;
}

.searchResult ul li img {
  width: 100px;
}

.searchResult ul li span {
  font-size: 1rem;
  padding-left: 1rem;
}

.recomSearch ul li {
  width: 100px;
  height: 2rem;
  border-radius: 1rem;
  border: 1px solid #e6e6e6;
  line-height: 2rem;
  margin-bottom: 1rem;
}

.search-history {

}

.search-historyHeader {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

}


</style>
