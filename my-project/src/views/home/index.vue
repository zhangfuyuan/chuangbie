<template>
  <div>
    <index-topbar></index-topbar>

    <swiper></swiper>

    <div class="router">
      <div class="routerBtn">
        <router-link exact to="/classify"><a class="routerImg classifyBtn" href="javascript:void(0);" title="分类" :style="{ backgroundImage: 'url(' + bg + ')'}" ></a></router-link>
        <span>分类</span>
      </div>

      <div class="routerBtn">
        <router-link exact to="/rank"><a class="routerImg rankBtn" href="javascript:void(0);" title="排行" :style="{ backgroundImage: 'url(' + bg + ')'}" ></a></router-link>
        <span>排行</span>
      </div>

      <div class="routerBtn">
        <router-link exact to="/women"><a class="routerImg womenBtn" href="javascript:void(0);" title="女区" :style="{ backgroundImage: 'url(' + bg + ')'}" ></a></router-link>
        <span>女区</span>
      </div>

      <div class="routerBtn">
        <router-link exact to="/men"><a class="routerImg menBtn" href="javascript:void(0);" title="男区" :style="{ backgroundImage: 'url(' + bg + ')'}" ></a></router-link>
        <span>男区</span>
      </div>

      <div class="routerBtn">
        <router-link exact to="/booklist"><a class="routerImg listBtn" href="javascript:void(0);" title="书单" :style="{ backgroundImage: 'url(' + bg + ')'}" ></a></router-link>
        <span>书单</span>
      </div>
    </div>

    <index-content></index-content>

    <index-footer></index-footer>

  </div>
</template>

<script>
  import Vue from 'vue'
  import VueAwesomeSwiper from 'vue-awesome-swiper'
  Vue.use(VueAwesomeSwiper)

  import Swiper from '@/components/Swiper'
  import Topbar from '@/components/IndexTopbar'
  import Content from '@/components/IndexContent'
  import Footer from '@/components/Footer'

  export default {
    name: 'home',
    data: function(){
      return {
        bg: require('../../assets/img/router.png')
      }
    },
    components: {
      indexTopbar: Topbar,
      swiper: Swiper,
      indexContent: Content,
      indexFooter: Footer
    }
  }
</script>

<style>
.router {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 15px 0;
  border-bottom: 1px #e2e2e2 solid;
}

.routerBtn {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  font-size: 1rem;
}

a.routerImg {
  display: block;
  width: 88px;
  height: 88px;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 5px;
}

a.classifyBtn {
    background-position: 0 0;
}

a.rankBtn {
  background-position: 0 -88px;
}

a.womenBtn {
  background-position: 0 -176px;
}

a.menBtn {
  background-position: 0 -264px;
}

a.listBtn {
  background-position: 0 -352px;
}

@media (max-width: 768px) {
  .routerBtn {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    font-size: 14px;
  }

  a.routerImg {
    width: 44px;
    height: 44px;
  }

  a.classifyBtn {
    background-position: 0 0;
  }

  a.rankBtn {
    background-position: 0 -44px;
  }

  a.womenBtn {
    background-position: 0 -88px;
  }

  a.menBtn {
    background-position: 0 -132px;
  }

  a.listBtn {
    background-position: 0 -176px;
  }
}

@media (min-width: 768px) {
  .router {
    width: 80%;
    margin: 0 auto;
  }
}

</style>
