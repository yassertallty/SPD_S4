<script setup>
import { ref, watch } from 'vue';

const selectedSort = ref('price-asc');
const emit = defineEmits(['sort']);

// Auto-emit sort value when it changes
watch(selectedSort, (newValue) => {
  emit('sort', newValue);
});
</script>

<template>
  <div class="sort-container">
    <label>Sort by</label>
    <select v-model="selectedSort">
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name-asc">Name: A to Z</option>
      <option value="name-desc">Name: Z to A</option>
    </select>
  </div>
</template>

<style scoped>
.sort-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
}

select {
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background-color: white;
  font-size: 0.875rem;
  color: #2d3748;
  min-width: 180px;
}

@media (max-width: 768px) {
  .sort-container {
    width: 100%;
  }
  
  select {
    flex-grow: 1;
  }
}
</style>