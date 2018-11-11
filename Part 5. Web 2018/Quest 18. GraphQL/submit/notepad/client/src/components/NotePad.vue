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

import gql from "graphql-tag"

export default {
    name: "notepad",
    components: {
        NoteList,
        NoteArea
    },
    data: () => ({
        notes: [],
        username: null
    }),
    mounted() {
        this.$eventBus.$on("setUserInfo", username => {
            this.username = username

            if (this.username) {
                this.$apollo
                    .query({
                        query: gql`
                            query {
                                getMemoList {
                                    title
                                    content
                                    _id
                                }
                            }
                        `
                    })
                    .then(result => {
                        result.data.getMemoList.map(memoItem => {
                            this.notes.push(memoItem)
                        })
                    })
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
