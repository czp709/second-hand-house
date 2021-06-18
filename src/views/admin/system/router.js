import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
const routes = [
    {
        path:'/direction',
        component: resolve => require(['../../../components/layout/Home.vue'], resolve),
        children:[
            {
                path: '',
                component: resolve => require(['./information/SysDictionaryManage.vue'], resolve),
                meta: { title: '咨询推送' }
            }
        ],
		beforeEnter: function(to, from, next){
            var that = this
			// id和pw存放在 to.query里面
            console.log('失败')
			if(!localStorage.getItem("ms_username")) return next('/')
            next()
            
		}
    },
    {
        path:'/druid',
        component: resolve => require(['../../../components/layout/Home.vue'], resolve),
        children:[
            {
                path: '',
                component: resolve => require(['./house/DruidMonitor.vue'], resolve),
                meta: { title: '房屋信息' }
            }
        ],
		beforeEnter: function(to, from, next){
            var that = this
			// id和pw存放在 to.query里面
            console.log('失败')
			if(!localStorage.getItem("ms_username")) return next('/')
            next()
            
		}
    },
    {
        path:'/user',
        component: resolve => require(['../../../components/layout/Home.vue'], resolve),
        children:[
            {
                path: '',
                component: resolve => require(['./user/SysUserList.vue'], resolve),
                meta: { title: '户主管理' }
            }
        ],
		beforeEnter: function(to, from, next){
            var that = this
			// id和pw存放在 to.query里面
            console.log('失败')
			if(!localStorage.getItem("ms_username")) return next('/')
            next()
            
		}
    },
    {
        path:'/role',
        component: resolve => require(['../../../components/layout/Home.vue'], resolve),
        children:[
            {
                path: '',
                component: resolve => require(['./tenant/SysRoleList.vue'], resolve),
                meta: { title: '租户管理' }
            }
        ],
		beforeEnter: function(to, from, next){
            var that = this
			// id和pw存放在 to.query里面
            console.log('失败')
			if(!localStorage.getItem("ms_username")) return next('/')
            next()
            
		}
    },
    {
        path:'/medium',
        component: resolve => require(['../../../components/layout/Home.vue'], resolve),
        children:[
            {
                path: '',
                component: resolve => require(['./notice/SysNoticeManage.vue'], resolve),
                meta: { title: '中介' }
            }
        ],
		beforeEnter: function(to, from, next){
            var that = this
			// id和pw存放在 to.query里面
            console.log('失败')
			if(!localStorage.getItem("ms_username")) return next('/')
            next()
            
		}
    },
    {
        path:'/news',
        component: resolve => require(['../../../components/layout/Home.vue'], resolve),
        children:[
            {
                path: '',
                component: resolve => require(['./news/new.vue'], resolve),
                meta: { title: '用户反馈' }
            }
        ],
		beforeEnter: function(to, from, next){
            var that = this
			// id和pw存放在 to.query里面
            console.log('失败')
			if(!localStorage.getItem("ms_username")) return next('/')
            next()
            
		}
    },
    {
        path:'/sys',
        component: resolve => require(['../../../components/layout/Home.vue'], resolve),
        children:[
            {
                path: '',
                component: resolve => require(['./citys/SysOperationLogList.vue'], resolve),
                meta: { title: '合同' }
            }
        ],
        beforeEnter: function(to, from, next){
            var that = this
			// id和pw存放在 to.query里面
            console.log('失败')
			if(!localStorage.getItem("ms_username")) return next('/')
            next()
            
		}
        
    },
    {
        path:'/money',
        component: resolve => require(['../../../components/layout/Home.vue'], resolve),
        children:[
            {
                path: '',
                component: resolve => require(['./money/money.vue'], resolve),
                meta: { title: '押金' }
            }
        ],
        beforeEnter: function(to, from, next){
            var that = this
			// id和pw存放在 to.query里面
			if(!localStorage.getItem("ms_username")) return next('/')
            next()
            
		}
        
    },
]
export default routes
