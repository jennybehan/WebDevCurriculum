<template>
    <div class="login">
        <div class="input-wrapper">
            <div 
                class="user-info" 
                v-if="!username">
                    아이디 <input 
                        v-model="input.id"
                        type="text"
                        placeholder="아이디"
                        class="id"
                    >
                    패스워드 <input 
                        v-model="input.pw"
                        type="password"
                        placeholder="패스워드"
                        class="pw"
                    >
            </div>
            <div v-else class="user-info"></div>
        </div>
        <div class="button-wrapper">
            <button
                v-if="!username"
                class="login-btn"
                @click="setLogin"
            >로그인</button>
            <button
                v-else
                class="logout-btn"
                @click="logout"
            >로그아웃</button>
        </div>
    </div>
</template>

<script>
import { LOGIN_MUTATION } from "./../graphql.js"
import { login } from "../../resolvers.js"
import gql from "graphql-tag"

console.info(login)

// console.info(LOGIN_MUTATION)

export default {
    name: "login",
    data: () => ({
        username: null,
        input: {
            id: "",
            pw: "" // hide?
        }
    }),
    methods: {
        setLogin() {
            this.$http.post(
                "https://localhost:3000/login",
                this.$apollo.mutate({
                    mutation: gql`
                        mutation LoginMutation($id: String!, $pw: Int!) {
                            login(id: $id, pw: $pw)
                        }
                    `
                })
            )
        }
        // logout() {
        //     this.$http.post(`${baseUrl}/logout`, this.$data.input, loginConfig).then(res => {
        //         this.username = null
        //         this.$eventBus.$emit("setUserInfo", this.username)
        //         const userInfo = document.querySelector(".user-info")
        //         userInfo.textContent = ""
        //     })
        // [TODO] error 처리
        // }
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
    padding: 0.2rem 0.5rem;
    font-size: 16px;
}

.hide {
    display: none;
}
</style>
