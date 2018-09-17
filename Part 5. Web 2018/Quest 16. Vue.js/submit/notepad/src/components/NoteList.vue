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
import { eventBus } from "../main.js"

export default {
    name: "note-list",
    props: ["notes"],
    data: () => ({
        selectedNote: null,
        newNote: { _id: "", title: "", content: "", user: "" }
    }),
    created() {
        this.$eventBus.$on("selectNote", (id, index) => {
            this.index = index
        })
    },
    methods: {
        selectNote(id, index, data) {
            this.$eventBus.$emit("selectNote", id, index, data)
            this.selectedNote = index ? index : this.selectedNote
            this.newNote = data ? data : this.newNote
        },
        makeNewNote() {
            this.selectedNote = this.notes.length
            // 이미 newNote가 업데이트 되어버려서 여기 들어올 때도 또 겹침
            // [TODO] 선택된 상태에서 새로 만들 때 초기화가 필요함
            this.$eventBus.$emit("clearNote", this.selectedNote)
            this.selectNote(
                Math.random()
                    .toString(36)
                    .substr(2, 9),
                this.selectedNote,
                this.newNote
            )
            this.$props.notes.push(this.newNote)
        }
    }
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
