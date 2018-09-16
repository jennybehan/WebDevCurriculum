<template>
    <div class="login">
        <div class="input-wrapper">
            <div 
                class="user-info" 
                v-if="enableLogin">
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
                v-if="enableLogin"
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
const baseUrl = "http://localhost:3000";
const config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
};
const loginConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  credentials: "include"
};

export default {
  name: "login",
  data: () => ({
    input: {
      id: "",
      pw: "" // hide?
    },
    enableLogin: true
  }),
  methods: {
    setLogin() {
      this.$http
        .post(`${baseUrl}/login`, this.$data.input, loginConfig)
        .then(res => {
          console.log(res.data); // session에 저장해 놓은 정보가 담김
          // login에서 받은 정보를 다른 컴포넌트랑 공유하려면?
          const userInfo = document.querySelector(".user-info");
          userInfo.textContent = `${res.data.username}님이 로그인 했습니다.`;
          this.$data.enableLogin = false;
        })
        .catch(e => console.error(e));
    },
    logout() {
      this.$http
        .post(`${baseUrl}/logout`, this.$data.input, loginConfig)
        .then(res => {
          const userInfo = document.querySelector(".user-info");
          userInfo.textContent = "";
          this.$data.enableLogin = true;
        });
      // [TODO] error 처리
    }
  }
};
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
