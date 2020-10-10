import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/user'
        },
        {
            path: '/',
            component: () => import( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: {
                title: '自述文件'
            },
            children: [
                {
                    path: '/user',
                    component: () => import( /* webpackChunkName: "table" */ '../components/page/UserList.vue'),
                    meta: {
                        title: '用户列表'
                    }
                },
                {
                    path: '/addCommodity',
                    component: () => import( /* webpackChunkName: "icon" */ '../components/page/AddCommodity.vue'),
                    meta: {
                        title: '药品录入'
                    }
                },
                {
                    path: '/commodityList',
                    component: () => import( /* webpackChunkName: "icon" */ '../components/page/CommodityList.vue'),
                    meta: {
                        title: '药品列表'
                    }
                },
                {
                    path: '/addArticle',
                    component: () => import( /* webpackChunkName: "icon" */ '../components/page/AddArticle.vue'),
                    meta: {
                        title: '文章录入'
                    }
                },
                {
                    path: '/articleList',
                    component: () => import( /* webpackChunkName: "icon" */ '../components/page/ArticleList.vue'),
                    meta: {
                        title: '文章列表'
                    }
                }, 
                {
                    path: '/addDisease',
                    component: () => import( /* webpackChunkName: "icon" */ '../components/page/AddDisease.vue'),
                    meta: {
                        title: '疾病录入'
                    }
                }, {
                    path: '/diseaseList',
                    component: () => import( /* webpackChunkName: "icon" */ '../components/page/DiseaseList.vue'),
                    meta: {
                        title: '疾病列表'
                    }
                },
                {
                    path: '/statistics',
                    component: () => import( /* webpackChunkName: "icon" */ '../components/page/Statistics.vue'),
                    meta: {
                        title: '疫情大数据'
                    }
                },
                {
                    path: '/404',
                    component: () => import( /* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: {
                        title: '404'
                    }
                },
                {
                    path: '/403',
                    component: () => import( /* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: {
                        title: '403'
                    }
                }
            ]
        },
        {
            path: '/login',
            component: () => import( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: {
                title: '登录'
            }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});