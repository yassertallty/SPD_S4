<template>
  <div class="bg-gray-800 p-6 mb-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
    <div class="mb-4">
      <h2 class="text-2xl font-semibold text-indigo-500">{{ post.title }}</h2>
      <div class="flex flex-wrap mt-2">
        <span v-for="tag in tags" :key="tag" class="tag text-sm bg-indigo-600 text-white rounded-full px-3 py-1 m-1">
          {{ tag }}
        </span>
      </div>
    </div>
    <p class="text-gray-300 mb-6">{{ snippet }}</p>
    <div class="flex justify-between items-center">
      <router-link :to="{ name: 'postDetail', params: { id: post.id } }" class="btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2">
        Read More
      </router-link>
      <div class="space-x-4">
        <router-link :to="{ name: 'editPost', params: { id: post.id } }" class="text-yellow-500 hover:text-yellow-400 text-sm">
          Edit
        </router-link>
        <button @click="handleDelete" class="text-red-500 hover:text-red-400 text-sm">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete'])

const snippet = computed(() => {
  return props.post.body.substring(0, 100) + '...'
})

const tags = computed(() => {
  return props.post.tags.split(',').map(tag => tag.trim())
})

const handleDelete = async () => {
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      await fetch(`http://localhost:3000/posts/${props.post.id}`, {
        method: 'DELETE'
      })
      emit('delete', props.post.id)
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }
}
</script>
