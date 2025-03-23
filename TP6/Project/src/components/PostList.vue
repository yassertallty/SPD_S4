<template>
  <div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="post in posts" 
        :key="post.id" 
        class="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
      >
        <h2 class="text-xl font-semibold text-indigo-300 mb-2">
          {{ post.title }}
        </h2>
        <div class="flex flex-wrap gap-2 mb-4">
          <span 
            v-for="tag in post.tags.split(',')" 
            :key="tag" 
            class="bg-teal-500 text-white px-3 py-1 rounded-full text-sm"
          >
            {{ tag.trim() }}
          </span>
        </div>
        <p class="text-gray-300">{{ post.body.substring(0, 100) }}...</p>
        <div class="mt-4 flex justify-between">
          <router-link 
            :to="{ name: 'postDetail', params: { id: post.id } }" 
            class="bg-indigo-600 px-4 py-2 rounded-md text-white hover:bg-indigo-700 transition"
          >
            Read More
          </router-link>
          <div>
            <router-link 
              :to="{ name: 'editPost', params: { id: post.id } }" 
              class="text-yellow-400 hover:text-yellow-300 mr-4"
            >
              Edit
            </router-link>
            <button 
              @click="deletePost(post.id)" 
              class="text-red-400 hover:text-red-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted } from 'vue'
import SinglePost from './SinglePost.vue'
import getPosts from '../composables/getPosts'

const props = defineProps({
  tag: {
    type: String,
    default: null
  }
})

const { posts, error, loading, load } = getPosts(props.tag)

onMounted(load)

// Handle post deletion by reloading the posts
const handlePostDelete = () => {
  load()
}
</script>

<style scoped>
body {
  background-color: #121212; /* Darker background */
  color: #ffffff;
}

h1 {
  font-size: 1.75rem;
}

.card {
  background: linear-gradient(135deg, #282a36, #3b4252);
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}

.tag {
  background: #14b8a6;
  padding: 5px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
}

.btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: bold;
}

.btn-indigo {
  background: #6366f1;
  color: white;
}

.btn-indigo:hover {
  background: #4f46e5;
}
</style>
