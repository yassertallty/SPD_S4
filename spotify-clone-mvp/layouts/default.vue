<template>
  <div class="layout">
    <nav class="sidebar">
      <div class="logo">
        <NuxtLink to="/">
          <h1>Spotify Clone</h1>
        </NuxtLink>
      </div>
      
      <div class="nav-links">
        <NuxtLink to="/" class="nav-link">
          <span>🏠</span>
          <span>Home</span>
        </NuxtLink>
        <NuxtLink to="/playlists" class="nav-link">
          <span>🎵</span>
          <span>Playlists</span>
        </NuxtLink>
      </div>
      
      <div class="spotify-auth-section">
        <SpotifyLoginButton />
      </div>
    </nav>
    
    <main class="main-content">
      <slot />
    </main>
    
    <MusicPlayer />
  </div>
</template>

<script setup>
import SpotifyLoginButton from '~/components/SpotifyLoginButton.vue';
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
  background: #121212;
  color: #fff;
}

.sidebar {
  grid-column: 1;
  grid-row: 1;
  background: #000;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #1DB954;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #b3b3b3;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #fff;
}

.nav-link.router-link-active {
  color: #fff;
}

.spotify-auth-section {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-content {
  grid-column: 2;
  grid-row: 1;
  padding: 2rem;
  overflow-y: auto;
  padding-bottom: 90px; /* Account for music player height */
}
</style>
