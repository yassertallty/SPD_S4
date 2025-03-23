<template>
  <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h3 class="text-lg font-semibold mb-4 text-indigo-400">Tags</h3>
    <div v-if="loading" class="text-gray-400">Loading tags...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else class="flex flex-wrap gap-4">
      <router-link 
        v-for="tag in tags" 
        :key="tag"
        :to="{ name: 'tagPosts', params: { tag } }"
        class="text-sm font-semibold bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full px-4 py-2 hover:bg-gradient-to-l hover:from-teal-500 hover:to-blue-500 transition-all duration-300"
      >
        {{ tag }} ({{ getTagCount(tag) }})
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import getPosts from '../composables/getPosts'

const { posts, error, loading, load } = getPosts()

// Extract unique tags from all posts
const tags = computed(() => {
  if (!posts.value.length) return []
  
  const allTags = []
  posts.value.forEach(post => {
    const postTags = post.tags.split(',').map(tag => tag.trim())
    postTags.forEach(tag => {
      if (!allTags.includes(tag) && tag) {
        allTags.push(tag)
      }
    })
  })
  
  return allTags.sort()
})

// Count occurrences of each tag
const getTagCount = (tagName) => {
  return posts.value.filter(post => 
    post.tags.split(',').map(tag => tag.trim()).includes(tagName)
  ).length
}

onMounted(load)
</script>

<style scoped>
/* Improved tag design */
.text-sm {
  font-size: 0.875rem;
}

.bg-gradient-to-r {
  background: linear-gradient(to right, #3b82f6, #14b8a6);
}

.hover\:bg-gradient-to-l:hover {
  background: linear-gradient(to left, #14b8a6, #3b82f6);
}

.transition-all {
  transition: all 0.3s ease;
}

.rounded-full {
  border-radius: 9999px;
}

.text-white {
  color: #ffffff;
}

.px-4, .py-2 {
  padding: 0.5rem 1rem;
}
</style>
