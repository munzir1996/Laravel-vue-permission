/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
window.Form = Form;

Vue.use(VueRouter)
Vue.use(Vuex)

//support vue-router
import VueRouter from 'vue-router'
//support vuex
import Vuex from 'vuex'
import storeData from "./store/user"
// V-form
import { Form, HasError, AlertError } from 'vform'

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)


let routes = [
    { path: '/example', component: require('./components/ExampleComponent.vue').default },
    { path: '/dashboard', component: require('./components/DashboardComponent.vue').default },
    { path: '/user', component: require('./components/UserComponent.vue').default },
    { path: '/role', component: require('./components/RoleComponent.vue').default },
    { path: '/permission', component: require('./components/PermissionComponent.vue').default },
  ]

    const router = new VueRouter({
        mode: 'history',
        routes,
    })

    const store = new Vuex.Store(
        storeData
    )


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('dashboard-component', require('./components/DashboardComponent.vue').default);
Vue.component('role-component', require('./components/RoleComponent.vue').default);
Vue.component('permission-component', require('./components/PermissionComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    store,
});
