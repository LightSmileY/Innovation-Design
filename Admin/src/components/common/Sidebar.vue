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
                    icon: 'el-icon-lx-cascades',
                    index: 'index',
                    title: '首页'
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: '1',
                    title: '用户管理',
                    subs: [
                        {
                            index: 'user',
                            title: '用户列表'
                        },
                        {
                            index: 'admin',
                            title: '管理员列表'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: '2',
                    title: '医疗用品管理',
                    subs: [
                        {
                            index: 'commodity',
                            title: '医疗用品列表'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-emoji',
                    index: '3',
                    title: '幻灯片管理',
                    subs: [
                        {
                            index: 'indexslides',
                            title: '首页幻灯片'
                        },
                        {
                            index: 'comslides',
                            title: '商城页幻灯片'
                        }
                    ]
                },
                {
                    icon: 'el-icon-pie-chart',
                    index: 'statistics',
                    title: '数据统计'
                }
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
