import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/index'
        },
        {
            path: '/',
            component: () => import( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: {
                title: '自述文件'
            },
            children: [{
                    path: '/index',
                    component: () => import( /* webpackChunkName: "table" */ '../components/page/Index.vue'),
                    meta: {
                        title: '首页'
                    }
                },
                {
                    path: '/user',
                    component: () => import( /* webpackChunkName: "table" */ '../components/page/UserList.vue'),
                    meta: {
                        title: '用户列表'
                    }
                },
                {
                    path: '/admin',
                    component: () => import( /* webpackChunkName: "tabs" */ '../components/page/AdminList.vue'),
                    meta: {
                        title: '管理员列表'
                    }
                },
                {
                    path: '/commodity',
                    component: () => import( /* webpackChunkName: "icon" */ '../components/page/CommodityList.vue'),
                    meta: {
                        title: '医疗用品列表'
                    }
                },
                {
                    path: '/indexslides',
                    component: () => import( /* webpackChunkName: "icon" */ '../components/page/IndexSlides.vue'),
                    meta: {
                        title: '首页幻灯片'
                    }
                },
                {
                    path: '/comslides',
                    component: () => import( /* webpackChunkName: "icon" */ '../components/page/ComSlides.vue'),
                    meta: {
                        title: '商城幻灯片'
                    }
                },
                {
                    path: '/statistics',
                    component: () => import( /* webpackChunkName: "icon" */ '../components/page/Statistics.vue'),
                    meta: {
                        title: '数据统计'
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