<template>
    <input
      type="text"
      v-model="localSearchQuery"
      @input="$emit('search', localSearchQuery)"
      placeholder="Rechercher une pièce..."
    />
  </template>
  
  <script>
  export default {
    data() {
      return {
        localSearchQuery: '',
        pieces:[],
      };
    },
  };
  </script>
<style scoped>
input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #dfe6e9;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s;
}

input:focus {
  border-color: #74b9ff;
  box-shadow: 0 0 0 3px rgba(116, 185, 255, 0.2);
  outline: none;
}

input::placeholder {
  color: #b2bec3;
}
</style>
  