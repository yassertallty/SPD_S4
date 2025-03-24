<template>
    <div class="library">
      <div class="toolbar">
        <SearchBar @search="updateSearchQuery" />
        <StatusFilter @filter-change="updateStatusFilter" />
      </div>
      
      <div class="books-container">
        <BookCard 
          v-for="book in filteredBooks" 
          :key="book.id" 
          :book="book" 
          @click="openBookDetails(book)"
        />
        
        <p v-if="filteredBooks.length === 0" class="no-results">
          Aucun livre ne correspond à votre recherche.
        </p>
      </div>
      
      <BookDetails 
        v-if="selectedBook" 
        :book="selectedBook" 
        @close="closeBookDetails" 
      />
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import BookCard from '../components/BookCard.vue';
  import BookDetails from '../components/BookDetails.vue';
  import SearchBar from '../components/Searchbar.vue';
  import StatusFilter from '../components/StatusFilter.vue';
  import { books } from '../data/books.js';
  
  export default {
    name: 'Library',
    components: {
      BookCard,
      BookDetails,
      SearchBar,
      StatusFilter
    },
    setup() {
      const allBooks = ref(books);
      const searchQuery = ref('');
      const statusFilter = ref('tous');
      const selectedBook = ref(null);
  
      const filteredBooks = computed(() => {
        return allBooks.value.filter(book => {
          const matchesSearch = book.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                            book.author.toLowerCase().includes(searchQuery.value.toLowerCase());
          
          const matchesStatus = statusFilter.value === 'tous' || book.status === statusFilter.value;
          
          return matchesSearch && matchesStatus;
        });
      });
  
      const updateSearchQuery = (query) => {
        searchQuery.value = query;
      };
  
      const updateStatusFilter = (status) => {
        statusFilter.value = status;
      };
  
      const openBookDetails = (book) => {
        selectedBook.value = book;
      };
  
      const closeBookDetails = () => {
        selectedBook.value = null;
      };
  
      return {
        filteredBooks,
        selectedBook,
        updateSearchQuery,
        updateStatusFilter,
        openBookDetails,
        closeBookDetails
      };
    }
  }
  </script>
  
  <style scoped>
  .library {
    position: relative;
    padding: 20px;
    background-color: #f9f9f9;
    min-height: 100vh;
  }
  
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .books-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px 40px; 
    margin: 0 auto;
    max-width: 1200px;
  }
  
  .no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 40px;
    font-size: 18px;
    color: #666;
  }
  
  .book-card {
    background-color: #fff; 
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  @media (max-width: 768px) {
    .toolbar {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
  
    .books-container {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
  }
  
  @media (max-width: 480px) {
    .books-container {
      grid-template-columns: 1fr;
    }
  }
  </style>