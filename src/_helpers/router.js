import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage'
import LoginPage from '../login/LoginPage'
import RegisterPage from '../register/RegisterPage'
import Home from '../views/Chart.vue'

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            component: Home
        },
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/register',
            component: RegisterPage
        },
        {
            path: '/homepage',
            component: HomePage
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/About.vue')
        }, {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/Profile.vue')
        }, {
            path: '/team',
            name: 'team',
            component: () => import('../views/Team.vue')
        }, {
            path: '/projects',
            name: 'projects',
            component: () => import('../views/Projects.vue')
        }, {
            path: '/todo',
            name: 'todo',
            component: () => import('../views/Todo.vue')
        }, {
            path: '/listtodo',
            name: 'listtodo',
            component: () => import('../views/ListTodo.vue')
        },

        // otherwise redirect to home
        {
            path: '*',
            redirect: '/'
        }
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
})
