import Vue from 'vue';
import Router from 'vue-router';
import mainRouter from '@/views/main/router'
import adminSystemRouter from '@/views/admin/system/router'

Vue.use(Router);
let routes = [
    ...mainRouter,
    ...adminSystemRouter
]
const router = new Router({
    routes

})
export default router