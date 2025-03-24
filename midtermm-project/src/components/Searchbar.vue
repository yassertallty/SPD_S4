<template>
  <div class="search-bar">
    <i class="search-icon">🔍</i>
    <input 
      type="text" 
      placeholder="Rechercher par titre ou auteur..." 
      v-model="searchInput"
      @input="emitSearch"
    >
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'SearchBar',
  emits: ['search'],
  setup(props, { emit }) {
    const searchInput = ref('');
    
    const emitSearch = () => {
      emit('search', searchInput.value);
    };
    
    return {
      searchInput,
      emitSearch
    };
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 30px;
  padding: 0 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.search-icon {
  margin-right: 10px;
  color: #666;
}

input {
  border: none;
  outline: none;
  padding: 12px 0;
  width: 100%;
  font-size: 16px;
}

input::placeholder {
  color: #999;
}
</style>