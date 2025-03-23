<template>
  <nav class="navbar">
    <div class="container mx-auto flex justify-between items-center py-4 px-6">
      <router-link to="/" class="text-2xl font-bold text-white hover:text-indigo-300 transition">
        Vue Blog
      </router-link>
      <div class="hidden md:flex space-x-6">
        <router-link 
          to="/" 
          class="nav-link"
        >
          Home
        </router-link>
        <router-link 
          to="/add" 
          class="nav-link bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-500 transition"
        >
          Add Post
        </router-link>
      </div>

      <button @click="toggleMenu" class="md:hidden text-white focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>
    <div v-if="isMenuOpen" class="mobile-menu md:hidden">
      <router-link to="/" class="block py-2 px-4 text-white hover:bg-indigo-600">Home</router-link>
      <router-link to="/add" class="block py-2 px-4 text-white hover:bg-indigo-600">Add Post</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>
/* Navbar Styling */
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

/* Navbar Links */
.nav-link {
  color: white;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
}

.nav-link:hover {
  color: #c7d2fe;
}

/* Mobile Menu */
.mobile-menu {
  background: #1e1e2e;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
