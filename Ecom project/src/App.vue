<script setup>
import { ref, onMounted } from 'vue';
import SearchBar from './components/components/Searchbar.vue';
import ProductCard from './components/components/Productcard.vue';
import FilterBar from './components/components/Filterbar.vue';
import Cart from './components/components/Cart.vue';
import SortBar from './components/components/Sortbar.vue';

const pieces = ref([]);
const filteredPieces = ref([]);
const cart = ref([]);
const searchQuery = ref('');
const sortOrder = ref('price-asc');
const selectedFilters = ref({ 
  category: '', 
  available: false 
});

// Chargement des données
onMounted(async () => {
  try {
    const response = await fetch('/pieces-autos.json');
    if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
    
    const data = await response.json();
    pieces.value = data;
    applyFilters();
    applySort();   

  } catch (error) {
    console.error("Erreur de chargement :", error);
  }
});

// Tri
function applySort(newOrder) {
  sortOrder.value = newOrder || sortOrder.value;
  filteredPieces.value.sort((a, b) => {
    return sortOrder.value === 'price-asc' ? a.prix - b.prix : b.prix - a.prix;
  });
}

function updateFilters(filters) {
  console.log('Received filters:', filters);
  selectedFilters.value = filters;
  applyFilters();
}


// Panier
function addToCart(piece) {
  console.log('Adding to cart:', piece); // Debug logging
  
  const existing = cart.value.find(item => item.id === piece.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.value.push({ 
      id: piece.id,
      nom: piece.nom,
      prix: piece.prix,
      image: piece.image, // Using lowercase 'image' to match possible JSON structure
      quantity: 1 
    });
  }
  console.log('Panier actuel:', cart.value); // Debug
}


function applyFilters() {
  console.log('Applying filters:', selectedFilters.value);
  console.log('Original pieces:', pieces.value);
  
  filteredPieces.value = pieces.value.filter(piece => {
    // Category filter - handle empty or missing values
    const categoryMatch = !selectedFilters.value.category || 
                         selectedFilters.value.category === '' ||
                         (piece.categorie && piece.categorie.toLowerCase() === selectedFilters.value.category.toLowerCase());
    
    // Availability filter - handle different data types
    const availabilityMatch = !selectedFilters.value.available || 
                             piece.Disponible === true || 
                             piece.Disponible === "true" || 
                             piece.Disponible === 1;
    
    // Search filter - handle empty or missing values
    const searchMatch = !searchQuery.value || 
                       searchQuery.value === '' ||
                       (piece.nom && piece.nom.toLowerCase().includes(searchQuery.value.toLowerCase()));
    
    return categoryMatch && availabilityMatch && searchMatch;
  });
  
  // Apply the current sort after filtering
  applySort();
  
  console.log('Pièces filtrées:', filteredPieces.value);
}
</script>

<template>
  <div class="container">
    <SearchBar v-model="searchQuery" @search="applyFilters" />
    <div class="controls">
      <FilterBar @filter="updateFilters" />
        <SortBar @sort="(order) => { applySort(order); }" /> 
    </div>

    <div class="product-grid">
      <ProductCard 
  v-for="piece in filteredPieces" 
  :key="piece.id" 
  :piece="piece" 
  @add-to-cart="addToCart"
/>
</div>

    <Cart :cart="cart" />
  </div>
</template>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: #f8f9fa;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin: 2rem 0;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .controls {
    flex-direction: column;
  }
}
</style>