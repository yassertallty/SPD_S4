<script setup>
import { ref, onMounted, computed } from 'vue';
import SearchBar from './components/SearchBar.vue';
import ProductCard from './components/ProductCard.vue';
import FilterBar from './components/FilterBar.vue';
import Cart from './components/Cart.vue';
import SortBar from './components/SortBar.vue';

const pieces = ref([]);
const filteredPieces = ref([]);
const cart = ref([]);
const searchQuery = ref ('');
const sortOrder = ref('price-asc');
const selectedFilters = ref({ 
  category: '', 
  available: false 
});
const showCart = ref(false);
const cartItemCount = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0);
});

// Load data
onMounted(async () => {
  try {
    const response = await fetch('/pieces-autos.json');
    if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
    
    const data = await response.json();
    pieces.value = data;
    applyFilters();
  } catch (error) {
    console.error("Loading error:", error);
  }
});

// Apply sorting
function applySort(newOrder) {
  sortOrder.value = newOrder || sortOrder.value;
  
  filteredPieces.value.sort((a, b) => {
    if (sortOrder.value === 'price-asc') {
      return a.prix - b.prix;
    } else if (sortOrder.value === 'price-desc') {
      return b.prix - a.prix;
    } else if (sortOrder.value === 'name-asc') {
      return a.nom.localeCompare(b.nom);
    } else if (sortOrder.value === 'name-desc') {
      return b.nom.localeCompare(a.nom);
    }
    return 0;
  });
}

// Cart functions
function addToCart(piece) {
  const existing = cart.value.find(item => item.id === piece.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.value.push({ 
      id: piece.id,
      nom: piece.nom,
      prix: piece.prix,
      image: piece.Image, // Using the Image property from the JSON
      quantity: 1 
    });
  }
  showCart.value = true;
}

function removeFromCart(index) {
  cart.value.splice(index, 1);
}

function updateQuantity(index, newQuantity) {
  if (newQuantity > 0) {
    cart.value[index].quantity = newQuantity;
  } else {
    removeFromCart(index);
  }
}

function clearCart() {
  cart.value = [];
}

// Search and filtering
function applySearch(query) {
  searchQuery.value = query;
  applyFilters();
}

function updateFilters(filters) {
  selectedFilters.value = filters;
  applyFilters();
}

function applyFilters() {
  // First filter based on search and category
  filteredPieces.value = pieces.value.filter(piece => {
    const matchesSearch = piece.nom.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = !selectedFilters.value.category || 
                            piece.categorie.toLowerCase() === selectedFilters.value.category.toLowerCase();
    const matchesAvailability = !selectedFilters.value.available || piece.Disponible === true;
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });
  
  // Then apply current sort
  applySort();
}

function toggleCart() {
  showCart.value = !showCart.value;
}
</script>

<template>
  <div class="app-container">
    <header>
      <h1>Auto Parts Shop</h1>
      <div class="cart-icon" @click="toggleCart">
        <span class="material-icons">shopping_cart</span>
        <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
      </div>
    </header>

    <main>
      <div class="search-container">
        <SearchBar @search="applySearch" />
      </div>

      <div class="controls-container">
        <FilterBar @filter="updateFilters" />
        <SortBar @sort="applySort" />
      </div>

      <div v-if="filteredPieces.length > 0" class="product-grid">
        <ProductCard 
          v-for="piece in filteredPieces" 
          :key="piece.id" 
          :piece="piece" 
          @add-to-cart="addToCart" 
        />
      </div>
      <div v-else class="no-results">
        <p>No products match your search criteria.</p>
      </div>
    </main>

    <transition name="slide">
      <Cart 
        v-if="showCart" 
        :cart="cart" 
        @remove="removeFromCart" 
        @update-quantity="updateQuantity" 
        @checkout="clearCart"
        @close="showCart = false"
      />
    </transition>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: #f5f7fa;
  color: #2d3748;
}

.app-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

header h1 {
  color: #3182ce;
  font-weight: 700;
}

.cart-icon {
  position: relative;
  cursor: pointer;
}

.cart-icon .material-icons {
  font-size: 2rem;
  color: #4a5568;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e53e3e;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
}

.search-container {
  margin-bottom: 2rem;
}

.controls-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Transition for cart */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

@media (max-width: 768px) {
  .app-container {
    padding: 0 1rem;
  }
  
  .controls-container {
    flex-direction: column;
  }
  
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }
}
</style>