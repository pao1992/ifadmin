import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/vueeditor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-echarts-v3组件
                },
                {
                    path: '/mixcharts',
                    component: resolve => require(['../components/page/MixCharts.vue'], resolve)    // vue-echarts-v3组件
                },
                {
                    path: '/setting',
                        component: resolve => require(['../page/setting/index.vue'], resolve)

                },
                {
                    path: '/banner',
                    component: resolve => require(['../page/setting/banner.vue'], resolve)

                },
                {
                    path: '/category',
                    component: resolve => require(['../page/category/index.vue'], resolve)

                },
                {
                    path: '/category/add',
                    component: resolve => require(['../page/category/edit.vue'], resolve)
                },
                {
                    path: '/category/:id',
                    component: resolve => require(['../page/category/edit.vue'], resolve)
                },
                {
                    path: '/product',
                    component: resolve => require(['../page/product/index.vue'], resolve)
                },
                {
                    path: '/product/:id(\\d+)',
                    component: resolve => require(['../page/product/add.vue'], resolve)
                },
                {
                    path: '/product/add',
                    component: resolve => require(['../page/product/add.vue'], resolve)
                },
                {
                    path: '/order',
                        component: resolve => require(['../page/order/index.vue'], resolve)
                },
                {
                    path: '/schedule',
                        component: resolve => require(['../page/schedule/index.vue'], resolve)
                },
                {
                    path: '/activity',
                    component: resolve => require(['../page/activity/index.vue'], resolve)
                },
                {
                    path: '/date_activity',
                    component: resolve => require(['../page/activity/date_index.vue'], resolve)
                },
                {
                    path: '/activity/add',
                    component: resolve => require(['../page/activity/add_edit.vue'], resolve)
                },
                {
                    path: '/activity/edit/:id(\\d+)',
                    component: resolve => require(['../page/activity/add_edit.vue'], resolve)
                },
                {
                    path: '/coupon',
                    component: resolve => require(['../page/coupon/index.vue'], resolve)
                },
                {
                    path: '/user',
                    component: resolve => require(['../page/user/index.vue'], resolve)
                },
                {
                    path: '/timescard',
                        component: resolve => require(['../page/card/timescard/index.vue'], resolve)
                },
                {
                    path: '/timescard/add',
                        component: resolve => require(['../page/card/timescard/edit.vue'], resolve)
                },
                {
                    path: '/timescard/:id(\\d+)',
                        component: resolve => require(['../page/card/timescard/detail.vue'], resolve)
                },
                {
                    path: '../mixcharts',
                        component: resolve => require(['../components/page/MixCharts.vue'], resolve)    // vue-echarts-v3组件
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
