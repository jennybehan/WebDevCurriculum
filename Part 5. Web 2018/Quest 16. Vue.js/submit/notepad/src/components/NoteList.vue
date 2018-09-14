<template>
    <ul 
        class="note-list"
    >
        <li
            class="note-list-item"
            :class="{'active' : index === selectedNote}"
            @click="selectNote(notes[index]._id, index)"
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
    props: ['notes'],
    data: () => ({
        selectedNote: null
    }),
    created() {
        console.log(this)
        this.$eventBus.$on('selectNote', (id, index) => {
            this.index = index;
        });
    },
    methods: {
        selectNote(id, index) {
            this.$eventBus.$emit('selectNote', id, index);
            this.$data.selectedNote = index;
        },
        makeNewNote() {
            this.$data.selectedNote = null
            const newData = {
                _id: Math.random().toString(36).substr(2, 9),
                title: '',
                content: '',
                // noteData: {
                //     _id: Math.random().toString(36).substr(2, 9),
                //     title: '',
                //     content: '',
                // },
                // user: 'user01'
            }
            // this.$eventBus.$emit('makeNewNote', newData)
            // [TODO] 새 메뉴를 눌렀을 때 자동으로 n+1 번째 활성화
            // [TODO] 새 메뉴를 눌렀을 때 배열 길이가 n+1개 이상이면 더이상 + 버튼 활성화가 안되도록 하기
            this.$props.notes.push(newData)
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
