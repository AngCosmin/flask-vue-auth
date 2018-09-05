import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import axiosAuth from '@/api/axios-auth'

Vue.use(Router);

const routes = [
	{
		path: '/',
		component: Home,
	},
	{ 
		path: '/login', 
		component: Login,
	},
	{ 
		path: '/dashboard', 
		component: Dashboard,
		meta: { requiresAuth: true }
	},
];

const router = new Router({
	routes: routes,
});

router.beforeEach((to, from, next) => {
	let token = localStorage.getItem('token');
	let requireAuth = to.matched.some(record => record.meta.requiresAuth);

	if (!requireAuth) {
		next();
	}

	if (requireAuth && !token) {
		next('/login');
	}

	if (to.path === '/login') {
		if (token) {
			axiosAuth.post('/verify-token').then(() => {
				next('/dashboard');
			}).catch(() => {
				next();
			});
		}
		else {
			next();
		}
	}

	if (requireAuth && token) {
		axiosAuth.post('/verify-token').then(() => {
			next();
		}).catch(() => {
			next('/login');
		})
	}
});

export default router;