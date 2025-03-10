<template>
    <div class="cart">
      <h2>Mon Panier</h2>
      <div v-if="cart.length > 0">
        <div v-for="(item, index) in cart" :key="index" class="cart-item">
          <img :src="item.image" :alt="item.name" />
          <div>
            <h3>{{ item.nom }}</h3>
            <p>{{ item.prix }} €</p>
            <p>Quantité : 
              <input type="number" v-model.number="item.quantity" @change="updateQuantity(index)" min="1" />
            </p>
            <button @click="removeFromCart(index)">Supprimer</button>
          </div>
        </div>
  
        <hr />
        <div class="cart-total">
          <p>Total: {{ totalPrice }} €</p>
          <button @click="checkout">Passer à la caisse</button>
        </div>
      </div>
  
      <p v-else>Votre panier est vide</p>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        cart: [],  
      };
    },
    computed: {
      totalPrice() {
        return this.cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
      },
    },
    methods: {
      removeFromCart(index) {
        this.cart.splice(index, 1);
      },
      
  
      updateQuantity(index) {
        if (this.cart[index].quantity < 1) {
          this.cart[index].quantity = 1;
        }
      },

      checkout() {
        alert('Merci pour votre achat !');
        this.cart = []; 
      },
    },
  };
  </script>
<style scoped>
.cart {
  position: fixed;
  right: 2rem;
  top: 2rem;
  width: 350px;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.cart h2 {
  margin: 0 0 1.5rem;
  color: #2d3436;
  font-size: 1.5rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.cart-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.cart-item input[type="number"] {
  width: 60px;
  padding: 0.3rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin: 0 0.5rem;
}

.cart-item button {
  background: #ff7675;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
}

.cart-total {
  margin-top: 1.5rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: #2d3436;
}

.cart-total button {
  width: 100%;
  padding: 1rem;
  background: #00b894;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 1rem;
  font-weight: 600;
  cursor: pointer;
}
</style>
  
  