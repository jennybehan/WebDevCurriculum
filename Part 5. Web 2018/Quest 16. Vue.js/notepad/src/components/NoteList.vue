<template>
    <ul 
        class="note-list"
    >
        <li
            class="note-list-item"
            :class="{'active' : index === selectedNote}"
            @click="selectNote(index)"
            :key="note.index"
            v-for="(note, index) of notes"
        >
            {{ notes[index].title }}
        </li>
        <button 
            @click="makeNewNote"
            class="new-note-btn"
        >+</button>
    </ul>
</template>

<script>
import { eventBus } from '../main.js';
export default {
    name: 'note-list',
    props: ['notes', 'activeNote'], 
    data: () => ({
        selectedNote: null
    }),
    created() {
        this.$eventBus.$on('selectNote', (index) => {
            this.index = index;
        });
    },
    methods: {
        selectNote(index) {
            this.$eventBus.$emit('selectNote', index);
            this.$data.selectedNote = index;
        },
        makeNewNote() {
            this.$eventBus.$emit('makeNewNote')
            // [TODO] input, textarea를 비우고 모두 초기화
        },
    },
}
</script>

<style>
.note-list {
    background-image: linear-gradient(to right, #667eea 0%, #6f86d6 100%);
    min-width: 300px;
    height: 100vh;
}

.note-list-item {
    width: 100%; 
    height: 60px;
    line-height: 60px;
    font-size: 22px;
    font-weight: 800;
    text-align: center;
    border-bottom: 2px solid #91a5fc;
}

.note-list-item:hover {
    cursor: pointer;
    background-color: #9cacf5;
}

.active {
    background-color: #9cacf5;
}
</style>
