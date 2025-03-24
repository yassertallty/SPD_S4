<template>
  <div class="app">
    <header>
      <h1>Bibliothèque Universitaire</h1>
    </header>
    <main>
      <Library />
    </main>
  </div>
</template>

<script>
import Library from './views/Library.vue'

export default {
  name: 'App',
  components: {
    Library
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background-color: #9834d1;
  color: white;
  padding: 15px;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transform: skewX(-20deg);
  transform-origin: left;
  transition: transform 0.5s ease;
}

header:hover::before {
  transform: skewX(-20deg) translateX(100%);
}
</style>