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
import NoteList from './NoteList.vue'
import NoteArea from './NoteArea.vue'

export default {
    name: 'notepad',
    components: {
        NoteList,
        NoteArea,
    },
    data: () => ({
        notes: [],
    }),
    created() {
        const baseUrl = 'http://localhost:3000'
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }
        let vm = this;
        this.$http
            .get(`${baseUrl}/memo`, config)
            .then(res => {
                vm.notes = res.data.data
                vm.noteData = vm.notes.map(el => el.noteData)
                return vm.notes
            })
            .catch(e => console.error(e))
    }
}
</script>

<style>
.main {
    width: 100%;
    display: inline-flex;
}
</style>
