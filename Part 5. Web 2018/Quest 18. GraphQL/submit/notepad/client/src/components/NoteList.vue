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
            @click="makeNewTab"
            class="new-note-btn"
        >+</button>
    </ul>
</template>

<script>
import { eventBus } from "../main.js"

import gql from "graphql-tag"

export default {
    name: "note-list",
    props: ["notes"],
    data: () => ({
        selectedNote: null,
        newNote: { _id: "", title: "", content: "", user: "" }
    }),
    methods: {
        selectNote(id, index, data) {
            this.selectedNote = index ? index : this.selectedNote
            this.$apollo
                .query({
                    query: gql`
                        query($_id: _id) {
                            getMemo {
                                _id
                                content
                                title
                            }
                        }
                    `,
                    variables: {
                        _id: this.notes.map(item => {
                            if (item._id === this.notes[this.selectedNote]._id) {
                                return item._id
                            }
                        })
                    }
                })
                .then(result => {
                    console.log("result: ", result)
                })

            this.$eventBus.$emit("selectNote", id, index)
            this.newNote = data ? data : this.newNote
        },
        makeNewTab() {
            this.selectedNote = this.notes.length
            this.newNote = { title: "" }
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
