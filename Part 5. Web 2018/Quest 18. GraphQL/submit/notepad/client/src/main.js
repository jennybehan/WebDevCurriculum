import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.prototype.$http = axios

export const eventBus = new Vue();
// Vue.prototype에 store 객체 연결 (컨포넌트간 데이터 공유)
const store = {
    state: {
        key: ''
    }
};

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

new Vue({
    render: h => h(App)
}).$mount('#app')