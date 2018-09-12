<template>
    <div class="login">
        <div class="input-wrapper">
            아이디 <input 
                v-model="input.id"
                type="text"
                placeholder="아이디"
                class="id"
            >
        </div>
        <div class="input-wrapper">
            패스워드 <input 
                v-model="input.pw"
                type="password"
                placeholder="패스워드"
                class="pw"
            >
        </div>
        <div class="button-wrapper">
            <button 
                class="login-btn"
                @click="setLogin"
            >로그인</button>
            <button class="logout-btn">로그아웃</button>
        </div>
    </div>
</template>

<script>
const baseUrl = 'http://localhost:3000'
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}
const loginConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include',
}
export default {
    name: 'login',
    // [TODO] data가 아니라 다른 방식으로 v-model에 있는 login 데이터를 가져와야 
    data: () => ({
        input: {
            id: '',
            pw: ''
        }
    }),
    methods: {
        setUser() {
            this.$http
                .get(`${baseUrl}/user`)
                .then(res => console.log(res))
                .catch(e => console.error(e))
        },
        setLogin() {
            this.$http
                .post(`${baseUrl}/login`, this.$data.input, loginConfig)
                .then(result => console.log(result))
                .catch(e => console.error(e))
        },
        logout() {

        }
    }
}
</script>

<style>
.login {
    margin-left: auto;
    padding: 1rem;
    border-top: 1px solid #d1caca;
}

.input-wrapper,
.button-wrapper {
    display: inline-block;
}
.input-wrapper {
    margin-left: 10px;
}

.login input {
    padding: .2rem .5rem;
    font-size: 16px;
}
</style>
