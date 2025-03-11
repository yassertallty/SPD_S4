<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const emit = defineEmits(['search']);

function handleSearch() {
  emit('search', searchQuery.value);
}

function handleInput() {
  emit('search', searchQuery.value);
}
</script>

<template>
  <div class="search-container">
    <div class="search-input-container">
      <span class="search-icon material-icons">search</span>
      <input
        type="text"
        v-model="searchQuery"
        @input="handleInput"
        @keyup.enter="handleSearch"
        placeholder="Search for auto parts..."
      />
      <button 
        v-if="searchQuery" 
        @click="searchQuery = ''; handleSearch()" 
        class="clear-button"
      >
        <span class="material-icons">close</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  width: 100%;
}

.search-input-container {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
}

input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

input:focus {
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  outline: none;
}

.clear-button {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #a0aec0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-button:hover {
  color: #4a5568;
}
</style>