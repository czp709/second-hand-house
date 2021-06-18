<template>
    <div class="aside" style="width:200px;">
        <div class="logo" style="display:flex;justify-content: center;align-items: center;height:60px;background:#002140;font-size:0;">
            <div class="cai">管理系统</div>
        </div>
        <el-menu
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                background-color="#242f42"
                text-color="#fff"
                active-text-color="#ffd04b"
                router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">
                                    <i :class="subItem.icon"></i><span slot="title">{{ subItem.title }}</span>
                                    {{ subItem.title }}
                                </template>
                                <!--三级菜单-->
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>
<script>
export default {
   name:'Aside',
   props:{
       isCollapse:{
           type:Boolean,
           default:false
       }
   },
   data () {
       return {
           // isCollapse: false
           items: [
                {
                   icon: 'el-icon-star-on',
                   index: 'dashboard',
                   title: '城市管理'
                },
                {
                   icon: 'el-icon-star-on',
                   index: '3',
                   title: '用户管理',
                   subs: [
                       {
                           index: 'role',
                           title: '租户'
                       },
                       {
                           index: 'user',
                           title: '户主'
                       },
                        {
                           index: 'medium',
                           title: '中介'
                       }
                   ]
                },
                {
                   icon: 'el-icon-star-on',
                   index: 'direction',
                   title: '资讯推送',
                },
                {
                   icon: 'el-icon-star-on',
                   index: 'druid',
                   title: '房屋信息管理',
                },
                {
                   icon: 'el-icon-star-on',
                   index: 'news',
                   title: '用户反馈信息',
                },
                {
                   icon: 'el-icon-star-on',
                   index: 'sys',
                   title: '合约',
                },
                {
                   icon: 'el-icon-star-on',
                   index: 'money',
                   title: '押金',
                },
           ]
       }
   },
   computed :{
       onRoutes(){
           return this.$route.path.replace('/','');
       }
   }
}
</script>
<style>
    .cai{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
