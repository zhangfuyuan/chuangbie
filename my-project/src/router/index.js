import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Home from '@/views/home/index'
import Login from '@/views/login/index'
import Register from '@/views/register/index'
import Bookrack from '@/views/bookrack/index'
import Search from '@/views/search/index'
import Classify from '@/views/classify/index'
import Rank from '@/views/rank/index'
import Women from '@/views/women/index'
import Men from '@/views/men/index'
import Booklist from '@/views/booklist/index'
import Classifydetails from '@/views/classifydetails/index'

import BookDetails from '@/components/BookDetails'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/bookrack',
      name: 'Bookrack',
      component: Bookrack
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/classify',
      name: 'Classify',
      component: Classify
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/women',
      name: 'Women',
      component: Women
    },
    {
      path: '/men',
      name: 'Men',
      component: Men
    },
    {
      path: '/booklist',
      name: 'Booklist',
      component: Booklist
    },
    {
      path: '/bookdetails/:title?&:catalogId?',
      name: 'BookDetails',
      component: BookDetails
    },
    {
      path: '/classifydetails/:classifydetailsId?&:classifydetailsTitle?',
      name: 'Classifydetails',
      component: Classifydetails
    },
    {
      path: '*',
      name: 'NotFound',
      component: Home
    }
  ]
})
