const rol = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/Dashboard',
        component: resolve => require(['@/components/layout/Home.vue'], resolve),
        meta: {requireAuth:true},
        children:[
            {
                path: '/dashboard',
                component: resolve => require(['./Dashboard.vue'], resolve),
                meta: { title: '系统首页' }
            }
        ],
		//next是一个方法，只有执行它 路由才会真正会跳转
		beforeEnter: function(to, from, next){
            var that = this
			// id和pw存放在 to.query里面
            console.log('失败')
			if(!localStorage.getItem("ms_username")) return next('/')
            next()
            
		}
    },
    {
        path:'/login',
        component:resolve => require(['./Login.vue'],resolve),
        meta:{title:'登录页'}
    }
]


export default rol