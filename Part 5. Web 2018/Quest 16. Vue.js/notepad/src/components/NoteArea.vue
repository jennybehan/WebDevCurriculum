<template>
    <div class="note">
        <input 
            v-model="title"
            type="text" 
            placeholder="노트 제목"
            class="title"
        >
        <textarea
            v-model="content"
            type="text" 
            class="content"
            placeholder="노트 내용을 적어주세요."
        >
        </textarea>
        <div class="button-wrapper">
            <button @click="saveNote">save</button>
            <button @click="deleteNote">delete</button>
        </div>
    </div>
</template>

<script>
import { eventBus } from '../main.js';
const baseUrl = 'http://localhost:3000'
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
}

export default {
    name: 'notearea',
    data() {
        return {
            note: {
                _id: null,
            }
        }
    },
    props: ['_id', 'notes'],
    computed: {
        title: {
            get() {
                return this.notes.title
            },
            set(value) {
                this.notes.title = value
            }
        },
        content: {
            get() { 
                return this.notes.content 
            },
            set(value) {
                this.notes.content = value
            }
        }
    },
    created() {
        this.$eventBus.$on('selectNote', (index) => {
            this.note = this.notes[index];
            document.querySelector('.note .title').value = this.note.title;
            document.querySelector('.note .content').value = this.note.content;
        });
    },
    methods: {
        saveNote() {
            const body = {
                _id: this.notes._id || Math.random().toString(36).substr(2, 9),
                title: this.notes.title,
                content: this.notes.content // content 값이 들어가지 않음
            }
            let vm = this;
            this.$http
                .post(`${baseUrl}/memo`, body, config)
                .then(result => console.log(result))
                .then(location.reload(true))
        },
        deleteNote() {
            // [TODO] 선택된 상황에서만(_id가 있는 상황에서만) button click 가능하게
            this.$http
                .delete(`${baseUrl}/memo/${this.note._id}`, 
                        this.note._id)
                .then(res => console.log(res))
                .then(location.reload(true))
        },
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
    padding: .5rem .8rem;
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
