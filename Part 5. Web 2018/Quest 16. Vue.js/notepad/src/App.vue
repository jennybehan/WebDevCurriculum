<template>
  <div id="app">
    <header>
      <div>
        <p>📝 Note-app</p>
      </div>
      <NoteLogin />
    </header>
    <NotePad />
  </div>
</template>

<script>
import NotePad from './components/NotePad.vue'
import NoteLogin from './components/NoteLogin.vue'

export default {
  name: 'app',
  components: {
    NoteLogin,
    NotePad,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header {
  border-bottom: 1px solid#d1caca;
}

header p {
  padding: 1rem;
  font-size: 20px;
  font-weight: 800;
}

body {
  margin: 0;
  padding: 0;
}

ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}

button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    outline: none;
    background-color: #f8ebe7;
    padding: 5px 10px;
    border-radius: 3px;
    box-shadow: 1px 1px 1px #eeeeee;
    margin: 5px;
    font-size: 18px;
}
</style>
