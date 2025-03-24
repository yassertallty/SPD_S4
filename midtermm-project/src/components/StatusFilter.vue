<template>
    <div class="status-filter">
      <label>Filtrer par statut:</label>
      <select v-model="selectedStatus" @change="emitChange">
        <option value="tous">Tous</option>
        <option value="disponible">Disponible</option>
        <option value="emprunté">Emprunté</option>
      </select>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'StatusFilter',
    emits: ['filter-change'],
    setup(props, { emit }) {
      const selectedStatus = ref('tous');
      
      const emitChange = () => {
        emit('filter-change', selectedStatus.value);
      };
      
      return {
        selectedStatus,
        emitChange
      };
    }
  }
  </script>
  
  <style scoped>
  .status-filter {
    display: flex;
    align-items: center;
  }
  
  label {
    margin-right: 10px;
    font-size: 14px;
    color: #666;
  }
  
  select {
    padding: 8px 12px;
    border-radius: 5px;
    border: 1px solid #ddd;
    background-color: white;
    font-size: 14px;
    outline: none;
    cursor: pointer;
  }
  
  select:focus {
    border-color: #2c3e50;
  }
  </style>