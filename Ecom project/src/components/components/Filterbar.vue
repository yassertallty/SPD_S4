<template>
    <div>
      <select v-model="selectedCategory" @change="applyFilters">
        <option value="">Toutes les catégories</option>
        <option value="moteur">Moteur</option>
        <option value="frein">Frein</option>
        <option value="suspension">Suspension</option>
      </select>

      <label>
        <input type="checkbox" v-model="onlyAvailable" @change="applyFilters" />
        Afficher uniquement les pièces disponibles
      </label>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      selectedCategory: '',
      onlyAvailable: false,
    };
  },
  methods: {
    applyFilters() {
      this.$emit('filter', {
        category: this.selectedCategory, 
        available: this.onlyAvailable  
      });
    },
  },
};
</script>
<style scoped>
select {
  padding: 0.8rem 1.2rem;
  border: 2px solid #dfe6e9;
  border-radius: 8px;
  font-size: 1rem;
  margin-right: 1rem;
  transition: border-color 0.2s;
}

select:focus {
  border-color: #74b9ff;
  outline: none;
}

label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #636e72;
}

input[type="checkbox"] {
  width: 1.2rem;
  height: 1.2rem;
  accent-color: #00b894;
}
</style>
