<template>
  <div>
    <p v-if="loading">Authenticating with Spotify...</p>
    <p v-else-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const loading = ref(true);
const error = ref('');
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  const code = route.query.code;
  if (!code) {
    error.value = 'No code found in URL.';
    loading.value = false;
    return;
  }

  try {
    // Call your backend to exchange code for token
    const response = await axios.get(`/api/spotify-token?code=${code}`);
    const { access_token, refresh_token } = response.data;

    // Store tokens (for demo, use localStorage; for production, use Pinia or cookies)
    localStorage.setItem('spotify_access_token', access_token);
    localStorage.setItem('spotify_refresh_token', refresh_token);

    // Redirect to home or dashboard
    router.push('/');
  } catch (err) {
    error.value = 'Failed to authenticate with Spotify.';
  } finally {
    loading.value = false;
  }
});
</script> 