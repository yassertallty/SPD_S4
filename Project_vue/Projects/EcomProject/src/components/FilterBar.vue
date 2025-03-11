<script setup>
import { ref, onMounted, computed, watch } from 'vue';

const selectedCategory = ref('');
const onlyAvailable = ref(false);
const categories = ref([]);
const uniqueCategories = computed(() => {
  return ['', ...categories.value].map(category => ({
    value: category.toLowerCase(),
    label: category || 'All Categories'
  }));
});

const emit = defineEmits(['filter']);

onMounted(async () => {
  try {
    const response = await fetch('/pieces-autos.json');
    if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
    
    const data = await response.json();
    // Extract unique categories from data
    const categorySet = new Set(data.map(item => item.categorie));
    categories.value = Array.from(categorySet).sort();
    
    // Initial filter emission
    emitFilter();
  } catch (error) {
    console.error("Error loading categories:", error);
  }
});

function emitFilter() {
  emit('filter', {
    category: selectedCategory.value,
    available: onlyAvailable.value
  });
}

// Watch for changes to emit filter updates
watch([selectedCategory, onlyAvailable], () => {
  emitFilter();
});
</script>

<template>
  <div class="filter-container">
    <div class="filter-group">
      <label>Category</label>
      <select v-model="selectedCategory">
        <option 
          v-for="category in uniqueCategories" 
          :key="category.value" 
          :value="category.value"
        >
          {{ category.label }}
        </option>
      </select>
    </div>

    <div class="filter-group checkbox">
      <label>
        <input type="checkbox" v-model="onlyAvailable" />
        <span>Show only available items</span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.filter-container {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group.checkbox {
  flex-direction: row;
  align-items: center;
}

label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
}

.filter-group.checkbox label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

select {
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background-color: white;
  font-size: 0.875rem;
  color: #2d3748;
  min-width: 200px;
}

input[type="checkbox"] {
  width: 1.125rem;
  height: 1.125rem;
  accent-color: #3182ce;
  cursor: pointer;
}

@media (max-width: 768px) {
  .filter-container {
    flex-direction: column;
    align-items: flex-start;
  }
  
  select {
    width: 100%;
  }
}
</style>