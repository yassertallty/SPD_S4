<script setup>
const emit = defineEmits(['add-to-cart']); // Déclare l'événement

defineProps({
  piece: {
    type: Object,
    default: () => ({
      nom: "gateau",
      Disponible: true,
      prix: 120,
      categorie: "something",
      id: 2,
    })
  }
});
</script>

<template>
  <div class="product-card">
    <div class="badge" v-if="!piece.Disponible">Indisponible</div>
    <img v-if="piece.image" :src="piece.image" :alt="piece.nom" class="product-image" />
    <h3 class="product-title">{{ piece.nom }}</h3>
    <p class="product-category">{{ piece.categorie }}</p>
    <p class="product-price">{{ piece.prix }} €</p>
    <button 
      class="add-to-cart" 
      @click="emit('add-to-cart', piece)" 
      :disabled="!piece.Disponible">
    {{ piece.Disponible ? 'Ajouter au panier' : 'Rupture'}}
    </button>
  </div>  
</template>


<style scoped>
.product-card {
  position: relative;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.product-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1.2rem;
  background: #f5f5f5;
}

.product-title {
  font-size: 1.3rem;
  margin: 0 0 0.5rem;
  color: #2d3436;
  font-weight: 600;
}

.product-category {
  color: #636e72;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1.5rem;
  color: #00b894;
  font-weight: 700;
  margin: 1rem 0;
}

.add-to-cart {
  width: 100%;
  padding: 1rem;
  background: #0984e3;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.add-to-cart:hover {
  background: #0873c4;
}

.add-to-cart:disabled {
  background: #b2bec3;
  cursor: not-allowed;
}

.badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #d63031;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}
</style>