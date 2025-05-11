<template>
  <div class="spotify-login-container">
    <button class="spotify-login-btn" @click="loginWithSpotify">
      <svg class="spotify-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 168"><circle fill="#1ED760" cx="84" cy="84" r="84"/><path d="M120.1 122.9c-1.7 2.8-5.3 3.7-8.1 2-22.1-13.5-49.9-16.5-82.6-8.9-3.2.7-6.4-1.3-7.1-4.5-.7-3.2 1.3-6.4 4.5-7.1 35.2-8.1 65.1-4.7 89.1 10.2 2.8 1.7 3.7 5.3 2 8.3zm11.6-23.2c-2.1 3.4-6.5 4.5-9.9 2.4-25.3-15.5-63.9-20-93.7-10.7-3.8 1.1-7.8-1-8.9-4.8-1.1-3.8 1-7.8 4.8-8.9 33.8-10.2 76.1-5.3 104.6 12.1 3.4 2.1 4.5 6.5 2.4 9.9zm12.2-25.1c-29-17.2-77.2-18.8-104.1-10.1-4.4 1.4-9.1-1.1-10.5-5.5-1.4-4.4 1.1-9.1 5.5-10.5 30.2-9.5 82.2-7.7 114.6 11.3 4.1 2.4 5.5 7.7 3.1 11.8-2.4 4.1-7.7 5.5-11.8 3.1z" fill="#fff"/></svg>
      Login with Spotify
    </button>
    <div class="spotify-login-debug">
      <strong>Client ID:</strong> {{ config.public.SPOTIFY_CLIENT_ID || 'NOT SET' }}<br>
      <strong>Redirect URI:</strong> {{ config.public.SPOTIFY_REDIRECT_URI || 'NOT SET' }}
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

const loginWithSpotify = () => {
  const clientId = config.public.SPOTIFY_CLIENT_ID;
  const redirectUri = config.public.SPOTIFY_REDIRECT_URI;
  //alert(`Button clicked!\nClient ID: ${clientId}\nRedirect URI: ${redirectUri}`);
  //console.log('Clicked! Client ID:', clientId);
  //console.log('Redirect URI:', redirectUri);

  if (!clientId || !redirectUri) {
    alert('Missing Client ID or Redirect URI. Please check your .env and Nuxt config.');
    return;
  }

  const encodedRedirectUri = encodeURIComponent(redirectUri);
  const scope = encodeURIComponent('user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private streaming user-modify-playback-state');
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodedRedirectUri}&scope=${scope}`;
  window.location.href = authUrl;
};
</script>

<style scoped>
.spotify-login-container {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spotify-login-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #1DB954;
  color: #fff;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 0.9rem 2.2rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(30, 215, 96, 0.15);
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
  outline: none;
}

.spotify-login-btn:hover {
  background: #1ed760;
  box-shadow: 0 6px 24px rgba(30, 215, 96, 0.25);
  transform: translateY(-2px) scale(1.03);
}

.spotify-logo {
  width: 28px;
  height: 28px;
  display: inline-block;
}

.spotify-login-debug {
  margin-top: 1.5rem;
  color: #b3b3b3;
  font-size: 0.95rem;
  text-align: center;
  word-break: break-all;
}
</style>