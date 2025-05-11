<template>
  <div class="login-page">
    <div class="login-container">
      <h1>Login to Spotify Clone</h1>
      <SpotifyLoginButton />
    </div>
  </div>
</template>

<script setup>
import SpotifyLoginButton from '~/components/SpotifyLoginButton.vue';
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #121212;
  color: #fff;
}

.login-container {
  background: #282828;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
}

.login-container h1 {
  margin: 0 0 2rem;
  text-align: center;
  color: #1DB954;
}
</style>
