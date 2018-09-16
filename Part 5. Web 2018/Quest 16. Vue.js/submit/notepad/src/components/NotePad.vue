<template>
    <div class="main">
        <NoteList 
            :notes="notes"
        />
        <NoteArea
            :notes="notes"
        />
    </div>
</template>

<script>
import NoteList from "./NoteList.vue";
import NoteArea from "./NoteArea.vue";
import { eventBus } from "../main.js";

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
    created() {
        this.$eventBus.$on("setUserInfo", username => {
            this.$data.username = username;
            return this.$data.username;
        });
    },
    mounted() {
        const baseUrl = "http://localhost:3000";
        const config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        };
        let vm = this;
        // if (this.username) {
        this.$http
            .get(`${baseUrl}/memo`, config)
            .then(res => {
                vm.notes = res.data.data;
                console.log(vm.notes);
                vm.noteData = vm.notes.map(el => el.noteData);
                return vm.notes;
            })
            .catch(e => console.error(e));
        // }
    }
};
</script>

<style>
.main {
    width: 100%;
    display: inline-flex;
}
</style>
