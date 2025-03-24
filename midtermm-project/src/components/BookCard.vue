<template>
  <div class="book-card" @click="$emit('click')">
    <div class="status-badge" :class="book.status">
      {{ book.status }}
    </div>
    <img :src="book.image" :alt="book.title" class="book-image">
    <div class="book-info">
      <h3 class="book-title">{{ book.title }}</h3>
      <p class="book-author">{{ book.author }}</p>
      <p class="book-details">{{ book.year }} • {{ book.category }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookCard',
  props: {
    book: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.book-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.status-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.status-badge.disponible {
  background-color: #4caf50;
  color: white;
}

.status-badge.emprunté {
  background-color: #f44336;
  color: white;
}

.book-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.book-info {
  padding: 15px;
}

.book-title {
  margin: 0 0 5px 0;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-author {
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #666;
}

.book-details {
  margin: 0;
  font-size: 12px;
  color: #999;
}
</style>