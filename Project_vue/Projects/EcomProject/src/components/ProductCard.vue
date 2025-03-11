<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  piece: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['add-to-cart']);

function addToCart() {
  emit('add-to-cart', props.piece);
}
</script>

<template>
  <div class="product-card" :class="{ 'unavailable': !piece.Disponible }">
    <div class="product-badge" v-if="!piece.Disponible">Unavailable</div>
    <div class="product-badge in-stock" v-else>In Stock</div>
    
    <div class="product-image-container">
      <img 
        :src="piece.Image || `/api/placeholder/400/320`" 
        :alt="piece.nom" 
        class="product-image" 
      />
    </div>
    
    <div class="product-details">
      <h3 class="product-title">{{ piece.nom }}</h3>
      <p class="product-category">{{ piece.categorie }}</p>
      <div class="product-price-container">
        <p class="product-price">{{ piece.prix }} €</p>
        <button 
          class="add-to-cart-btn" 
          @click="addToCart"
          :disabled="!piece.Disponible"
        >
          <span class="material-icons">shopping_cart</span>
          <span>{{ piece.Disponible ? 'Add to Cart' : 'Out of Stock' }}</span>
        </button>
      </div>
    </div>
  </div>  
</template>

<style scoped>
.product-card {
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.product-card.unavailable {
  opacity: 0.8;
}

.product-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #e53e3e;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 1;
}

.product-badge.in-stock {
  background-color: #38a169;
}

.product-image-container {
  position: relative;
  padding-top: 66.67%; /* 3:2 aspect ratio */
  overflow: hidden;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-details {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-title {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
}

.product-category {
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 1rem;
  text-transform: capitalize;
}

.product-price-container {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #3182ce;
}

.add-to-cart-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-to-cart-btn:hover {
  background-color: #2c5282;
}

.add-to-cart-btn:disabled {
  background-color: #cbd5e0;
  cursor: not-allowed;
}

.add-to-cart-btn .material-icons {
  font-size: 1.125rem;
}

@media (max-width: 768px) {
  .product-title {
    font-size: 1rem;
  }
  
  .product-price {
    font-size: 1.125rem;
  }
  
  .add-to-cart-btn {
    padding: 0.375rem 0.75rem;
  }
  
  .add-to-cart-btn span:not(.material-icons) {
    display: none;
  }
}
</style>