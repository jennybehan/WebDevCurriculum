<template>
    <div class="main">
        <p v-if="!username">로그인이 필요합니다.</p>
        <NoteList
            v-if="username"
            :notes="notes"
        />
        <NoteArea
            v-if="username"
            :notes="notes"
            :username="username"
        />
    </div>
</template>

<script>
import NoteList from "./NoteList.vue"
import NoteArea from "./NoteArea.vue"
import { eventBus } from "../main.js"

export default {
    name: "notepad",
    components: {
        NoteList,
        NoteArea
    },
    data: () => ({
        notes: [],
        username: null,
        enableNoteArea: false
    }),
    mounted() {
        this.$eventBus.$on("setUserInfo", username => {
            this.username = username
            console.log(this.username)
            const baseUrl = "http://localhost:3000"
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }
            let vm = this
            if (this.username) {
                this.$http
                    .get(`${baseUrl}/memo`, config)
                    .then(res => {
                        vm.notes = res.data.data.filter(el => {
                            return el.user === this.username
                        })
                        return vm.data
                    })
                    .catch(e => console.error(e))
            }
        })
    }
}
</script>

<style>
.main {
    width: 100%;
    display: inline-flex;
}
</style>
