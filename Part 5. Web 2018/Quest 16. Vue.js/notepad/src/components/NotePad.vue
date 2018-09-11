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
                return vm.notes
            })
            .catch(e => {
                console.error(e)
            })
    },
    method: {
        newNote: function() {
            vm.notes.push({
                title: '',
                content: '',
                _id: Math.random().toString(36).substr(2, 9)
            })
            // this.id = Math.random().toString(36).substr(2, 9)
        },
        deleteNote: function() {
            vm.notes.splice(this.index, 1);
            // http
        },
    }
}
</script>

<style>
.main {
    width: 100%;
    display: inline-flex;
}
</style>
