<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-emoji',
                    index: '1',
                    title: '用户管理',
                    subs: [
                        {
                            index: 'user',
                            title: '用户列表'
                        }
                    ]
                },
                {
                    icon: 'el-icon-s-cooperation',
                    index: '2',
                    title: '药品管理',
                    subs: [
                        {
                            index: 'addCommodity',
                            title: '药品录入'
                        },
                        {
                            index: 'commodityList',
                            title: '药品列表'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: '3',
                    title: '文章管理',
                    subs: [
                        {
                            index: 'addArticle',
                            title: '文章录入'
                        },
                        {
                            index: 'articleList',
                            title: '文章列表'
                        }
                    ]
                },
                {
                    icon: 'el-icon-s-custom',
                    index: '4',
                    title: '疾病管理',
                    subs: [
                        {
                            index: 'addDisease',
                            title: '疾病录入'
                        },
                        {
                            index: 'diseaseList',
                            title: '疾病列表'
                        }
                    ]
                },
                // {
                //     icon: 'el-icon-pie-chart',
                //     index: 'statistics',
                //     title: '疫情大数据'
                // }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
