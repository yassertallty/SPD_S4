<template>
  <div class="modal-backdrop" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="$emit('close')">&times;</button>
      
      <div class="book-details">
        <img :src="book.image" :alt="book.title" class="book-image">
        
        <div class="book-info">
          <h2 class="book-title">{{ book.title }}</h2>
          <p class="book-author">{{ book.author }}</p>
          <p class="book-meta">
            <span class="year">{{ book.year }}</span> • 
            <span class="category">{{ book.category }}</span> • 
            <span class="status" :class="book.status">{{ book.status }}</span>
          </p>
          
          <div class="summary">
            <h3>Résumé</h3>
            <p>{{ book.summary }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookDetails',
  props: {
    book: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.book-details {
  display: flex;
  padding: 20px;
}

.book-image {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 20px;
}

.book-info {
  flex: 1;
}

.book-title {
  margin: 0 0 10px 0;
  font-size: 24px;
}

.book-author {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #666;
}

.book-meta {
  margin: 0 0 20px 0;
  font-size: 14px;
  color: #999;
}

.status {
  font-weight: bold;
}

.status.disponible {
  color: #4caf50;
}

.status.emprunté {
  color: #f44336;
}

.summary h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
}

.summary p {
  margin: 0;
  line-height: 1.6;
}

@media (max-width: 600px) {
  .book-details {
    flex-direction: column;
  }
  
  .book-image {
    width: 100%;
    height: 200px;
    margin-right: 0;
    margin-bottom: 20px;
  }
}
</style>