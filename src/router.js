import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Chart.vue'

Vue.use(Router)

export default new Router({

    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue')
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('./views/Profile.vue')
        },
        {
            path: '/team',
            name: 'team',
            component: () => import('./views/Team.vue')
        },
        {
            path: '/projects',
            name: 'projects',
            component: () => import('./views/Projects.vue')
        },
        {
            path: '/todo',
            name: 'todo',
            component: () => import('./views/Todo.vue')
        },
        {
            path: '/listtodo',
            name: 'listtodo',
            component: () => import('./views/ListTodo.vue')
        }
    ]
})
