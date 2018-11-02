import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import {
    ApolloClient
} from 'apollo-client'
import {
    HttpLink
} from 'apollo-link-http'
import {
    InMemoryCache
} from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

Vue.prototype.$http = axios

export const eventBus = new Vue();
// Vue.prototype에 store 객체 연결 (컨포넌트간 데이터 공유)
const store = {
    state: {
        key: ''
    }
};

const httpLink = new HttpLink({
    uri: 'http://localhost:3000',
    // credentials: 'include',
    connectToDevTools: true,
})

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

// Vue.protytpe에 전역 속성 추가
Object.defineProperties(Vue.prototype, {
    $eventBus: {
        get() {
            return eventBus;
        }
    },
    $store: {
        get() {
            return store;
        }
    }
});

// new Vue({
//     render: h => h(App)
// }).$mount('#app')

Vue.use(VueApollo)

new Vue({
    el: '#app',
    apolloProvider,
    render: h => h(App),
})