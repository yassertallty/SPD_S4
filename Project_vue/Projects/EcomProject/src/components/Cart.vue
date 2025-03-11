<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  cart: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['remove', 'update-quantity', 'checkout', 'close']);

const totalPrice = computed(() => {
  return props.cart.reduce((sum, item) => sum + (item.prix * item.quantity), 0);
});

function removeItem(index) {
  emit('remove', index);
}

function updateQuantity(index, event) {
  const newQuantity = parseInt(event.target.value);
  emit('update-quantity', index, newQuantity);
}

function checkout() {
  if (props.cart.length > 0) {
    emit('checkout');
    alert('Thank you for your purchase!');
  }
}
</script>

<template>
  <div class="cart-overlay" @click="emit('close')">
    <div class="cart-container" @click.stop>
      <div class="cart-header">
        <h2>My Cart</h2>
        <button class="close-btn" @click="emit('close')">
          <span class="material-icons">close</span>
        </button>
      </div>

      <div v-if="cart.length > 0" class="cart-items">
        <div v-for="(item, index) in cart" :key="item.id" class="cart-item">
          <div class="item-image">
            <img :src="item.image || `/api/placeholder/100/100`" :alt="item.nom" />
          </div>
          
          <div class="item-details">
            <h3>{{ item.nom }}</h3>
            <p class="item-price">{{ item.prix }} €</p>
          </div>
          
          <div class="item-actions">
            <div class="quantity-control">
              <button 
                @click="emit('update-quantity', index, item.quantity - 1)"
                :disabled="item.quantity <= 1"
              >
                <span class="material-icons">remove</span>
              </button>
              
              <input 
                type="number" 
                :value="item.quantity" 
                min="1" 
                @change="updateQuantity(index, $event)"
              />
              
              <button @click="emit('update-quantity', index, item.quantity + 1)">
                <span class="material-icons">add</span>
              </button>
            </div>
            
            <button class="remove-btn" @click="removeItem(index)">
              <span class="material-icons">delete</span>
            </button>
          </div>
        </div>
      </div>

      <div v-else class="empty-cart">
        <span class="material-icons">shopping_cart</span>
        <p>Your cart is empty</p>
      </div>

      <div class="cart-footer" v-if="cart.length > 0">
        <div class="cart-summary">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>{{ totalPrice.toFixed(2) }} €</span>
          </div>
          <div class="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div class="summary-row total">
            <span>Total:</span>
            <span>{{ totalPrice.toFixed(2) }} €</span>
          </div>
        </div>
        
        <button class="checkout-btn" @click="checkout">
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}

.cart-container {
  width: 100%;
  max-width: 450px;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.cart-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #718096;
}

.close-btn:hover {
  color: #2d3748;
}

.cart-items {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 0.375rem;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details h3 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #2d3748;
}

.item-price {
  font-weight: 600;
  color: #3182ce;
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
}

.quantity-control {
  display: flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  overflow: hidden;
}

.quantity-control button {
  background-color: #f7fafc;
  border: none;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.quantity-control button:hover {
  background-color: #edf2f7;
}

.quantity-control button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-control input {
  width: 2.5rem;
  height: 2rem;
  text-align: center;
  border: none;
  border-left: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
}

.quantity-control input::-webkit-inner-spin-button,
.quantity-control input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.remove-btn {
  background: none;
  border: none;
  color: #e53e3e;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  color: #c53030;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #a0aec0;
}

.empty-cart .material-icons {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.cart-footer {
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.cart-summary {
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #718096;
}

.summary-row.total {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  padding-top: 0.5rem;
  border-top: 1px solid #e2e8f0;
}

.checkout-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #38a169;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.checkout-btn:hover {
  background-color: #2f855a;
}

@media (max-width: 768px) {
  .cart-container {
    max-width: 100%;
  }
}
</style>