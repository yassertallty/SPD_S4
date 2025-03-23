<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <div class="lg:col-span-3">
      <div v-if="loading" class="text-center py-10">
        <p class="text-indigo-400 text-xl">Loading post...</p>
      </div>
      <div v-else-if="error" class="bg-red-900 p-4 rounded text-white mb-4">
        {{ error }}
      </div>
      <div v-else-if="post" class="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500">
        <h1 class="text-3xl font-semibold mb-6 text-white">{{ post.title }}</h1>
        
        <div class="flex flex-wrap mb-6 space-x-4">
          <router-link 
            v-for="tag in tags" 
            :key="tag"
            :to="{ name: 'tagPosts', params: { tag } }"
            class="text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 transition duration-200"
          >
            {{ tag }}
          </router-link>
        </div>
        
        <div class="prose prose-invert max-w-none mb-8">
          <p class="text-gray-300 whitespace-pre-line">{{ post.body }}</p>
        </div>
        
        <div class="flex justify-between items-center">
          <router-link to="/" class="px-4 py-2 bg-gray-700 rounded text-white hover:bg-gray-600 transition duration-300">
            Back to Posts
          </router-link>
          <div class="space-x-2">
            <router-link :to="{ name: 'editPost', params: { id: post.id } }" class="btn bg-yellow-500 hover:bg-yellow-600 text-white">
              Edit
            </router-link>
            <button @click="handleDelete" class="btn bg-red-600 hover:bg-red-700 text-white">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="lg:col-span-1">
      <TagCloud />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import getPost from '../composables/getPost'
import TagCloud from '../components/TagCloud.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const { post, error, loading, load } = getPost(props.id)

// Split tags string into array
const tags = computed(() => {
  return post.value?.tags?.split(',').map(tag => tag.trim()) || []
})

onMounted(load)

// Handle post deletion
const handleDelete = async () => {
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      const response = await fetch(`http://localhost:3000/posts/${props.id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete post')
      }
      
      router.push('/')
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }
}
</script>

<style scoped>
/* New color scheme and shadow effects */
.bg-gradient-to-r {
  background: linear-gradient(to right, #10b981, #14b8a6);
}

.prose {
  font-family: 'Georgia', serif;
  font-size: 1.125rem;
  line-height: 1.6;
}

.text-white {
  color: white;
}

.text-gray-300 {
  color: #d1d5db;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}

.bg-yellow-500 {
  background-color: #f59e0b;
}

.bg-red-600 {
  background-color: #dc2626;
}
</style>
