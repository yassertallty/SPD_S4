<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col justify-center">
    <h1 class="text-3xl font-bold mb-8 text-indigo-400 text-center">
      {{ id ? 'Edit Post' : 'Create New Post' }}
    </h1>
    
    <div v-if="loading" class="text-center py-10">
      <p class="text-indigo-400 text-xl">Loading post...</p>
    </div>
    <div v-else-if="error" class="bg-red-800 p-4 rounded-lg text-white mb-6">
      {{ error }}
    </div>
    
    <form v-else @submit.prevent="handleSubmit" class="bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
      <div class="mb-6">
        <label for="title" class="block text-sm font-medium text-gray-300 mb-2">Title</label>
        <input 
          type="text" 
          id="title" 
          v-model="title" 
          required
          class="w-full p-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>
      
      <div class="mb-6">
        <label for="body" class="block text-sm font-medium text-gray-300 mb-2">Content</label>
        <textarea 
          id="body" 
          v-model="body" 
          rows="8" 
          required
          class="w-full p-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
        ></textarea>
      </div>
      
      <div class="mb-6">
        <label for="tags" class="block text-sm font-medium text-gray-300 mb-2">Tags (comma separated)</label>
        <input 
          type="text" 
          id="tags" 
          v-model="tags" 
          placeholder="vue, javascript, webdev"
          class="w-full p-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>
      
      <div class="flex justify-between items-center">
        <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-300" :disabled="isSubmitting">
          {{ id ? 'Update Post' : 'Add Post' }}
        </button>
        <router-link to="/" class="text-gray-300 hover:text-gray-400 px-4 py-2">
          Cancel
        </router-link>
      </div>
      
      <div v-if="formError" class="mt-6 p-4 bg-red-800 text-white rounded-lg">
        {{ formError }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import getPost from '../composables/getPost'

const props = defineProps({
  id: {
    type: String,
    default: null
  }
})

const router = useRouter()

const title = ref('')
const body = ref('')
const tags = ref('')
const formError = ref(null)
const isSubmitting = ref(false)

const { post, error, loading, load } = props.id ? getPost(props.id) : { post: null, error: null, loading: false, load: () => {} }

onMounted(async () => {
  if (props.id) {
    await load()
    if (post.value) {
      title.value = post.value.title
      body.value = post.value.body
      tags.value = post.value.tags
    }
  }
})

const handleSubmit = async () => {
  isSubmitting.value = true
  formError.value = null
  
  if (!title.value.trim() || !body.value.trim()) {
    formError.value = 'Please fill in all fields'
    isSubmitting.value = false
    return
  }
  
  const postData = {
    title: title.value,
    body: body.value,
    tags: tags.value || 'general'
  }
  
  try {
    let response
    
    if (props.id) {
      response = await fetch(`http://localhost:3000/posts/${props.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      })
    } else {
      response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      })
    }
    
    if (!response.ok) {
      throw new Error(props.id ? 'Failed to update post' : 'Failed to create post')
    }
    
    const data = await response.json()
    router.push({ name: 'postDetail', params: { id: data.id } })
  } catch (err) {
    formError.value = err.message
  } finally {
    isSubmitting.value = false
  }
}
</script>
