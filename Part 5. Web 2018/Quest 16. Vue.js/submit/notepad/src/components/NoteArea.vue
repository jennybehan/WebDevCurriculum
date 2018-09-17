<template>
    <div class="note">
        <input 
            v-model="title"
            type="text" 
            placeholder="노트 제목"
            class="title"
            @blur="blurTitleFunc"
        >
        <textarea
            v-model="content"
            type="text" 
            class="content"
            placeholder="노트 내용을 적어주세요."
            @blur="blurContentFunc"
        >
        </textarea>
        <div class="button-wrapper">
            <button @click="saveNote">save</button>
            <button @click="deleteNote">delete</button>
        </div>
    </div>
</template>

<script>
// [TODO] 선택된 상황에서만(_id가 있는 상황에서만) button click 가능하게
import { eventBus } from "../main.js"

const baseUrl = "http://localhost:3000"
const config = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
}

export default {
    name: "notearea",
    data: () => ({
        note: {
            _id: null
        }
    }),
    props: ["_id", "notes", "username"],
    computed: {
        title: {
            get() {
                return this.note.title
            },
            set(value) {
                this.note.title = value
            }
        },
        content: {
            get() {
                return this.note.content
            },
            set(value) {
                this.note.content = value
            }
        }
    },
    created() {
        this.$eventBus.$on("selectNote", (id, index, data) => {
            console.log(id, index, data)
            console.log(this.username)
            this.note = this.notes.filter(el => el._id === id)[0] || data
            this.note._id = id
                ? id
                : Math.random()
                      .toString(36)
                      .substr(2, 9)
            this.note.user = this.username
            document.querySelector(".note .title").value = this.note ? this.note.title : data.title
            document.querySelector(".note .content").value = this.note ? this.note.content : data.content
        })
    },
    methods: {
        saveNote() {
            let noteData = {
                _id: this.note._id,
                title: this.note.title,
                content: this.note.content,
                user: this.note.user
            }
            let vm = this
            this.$http
                .post(`${baseUrl}/memo`, noteData, config)
                .then((this.note = {})) // [TODO] 메모 저장한 뒤 초기화
                .then((noteData = {}))
        },
        deleteNote() {
            this.$http
                .delete(`${baseUrl}/memo/${this.note._id}`, this.note._id)
                .then(this.notes.splice(this.notes.indexOf(this.note), 1))
                .then((this.note = {}))
                .then(res => console.log(res))
        },
        blurTitleFunc() {
            this.note.title = document.querySelector(".note .title").value
        },
        blurContentFunc() {
            this.note.content = document.querySelector(".note .content").value
        }
    }
}
</script>

<style>
.note {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
}

textarea,
input {
    outline: none;
    border-radius: 3px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    font-size: 22px;
    padding: 0.5rem 0.8rem;
}

.title {
    margin: 1rem;
    line-height: 30px;
    max-width: 300px;
}

.content {
    margin: 0 1rem;
    overflow-y: scroll;
    max-width: 400px;
    height: 500px;
}

.button-wrapper {
    margin: 0 1rem;
}
</style>
