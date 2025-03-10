<template>
    <div class="sort-bar">
      <label for="sort">Trier par :</label>
      <select v-model="selectedSort">
        <option value="price-asc">Prix croissant</option>
        <option value="price-desc">Prix décroissant</option>
      </select>
      <button @click="applySort">Appliquer le tri</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedSort: 'price-asc',
      };
    },
    methods: {
      applySort() {
        this.$emit('sort', this.selectedSort);
      },
    },
  };
  </script>
<style scoped>
.sort-bar {
  display: flex;
  gap: 1rem;
  align-items: center;
}

select {
  padding: 0.8rem;
  border: 2px solid #dfe6e9;
  border-radius: 8px;
  background: white;
}

button {
  padding: 0.8rem 1.5rem;
  background: #0984e3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #0873c4;
}
</style>
  