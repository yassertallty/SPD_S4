<template>
  <div class="playlists-page">
    <div class="page-header">
      <h1>Your Playlists</h1>
      <button @click="showCreateForm = true" class="create-btn">
        Create Playlist
      </button>
    </div>
    
    <div v-if="showCreateForm" class="create-playlist-form">
      <div class="form-header">
        <h2>Create New Playlist</h2>
        <button @click="showCreateForm = false" class="close-btn">×</button>
      </div>
      
      <form @submit.prevent="handleCreatePlaylist">
        <div class="form-group">
          <label for="playlist-name">Playlist Name</label>
          <input 
            type="text" 
            id="playlist-name" 
            v-model="newPlaylistName" 
            required 
            placeholder="Enter playlist name"
          />
        </div>
        
        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? 'Creating...' : 'Create' }}
        </button>
      </form>
    </div>
    
    <div v-if="playlists.length === 0" class="no-playlists">
      <p>You don't have any playlists yet.</p>
      <button @click="showCreateForm = true" class="create-btn">
        Create Your First Playlist
      </button>
    </div>
    
    <div v-else class="playlists-grid">
      <div 
        v-for="playlist in playlists" 
        :key="playlist.id"
        class="playlist-card"
      >
        <NuxtLink :to="`/playlists/${playlist.id}`" class="playlist-link">
          <div class="playlist-cover">
            <div v-if="playlist.tracks.length > 0" class="cover-grid">
              <img 
                v-for="(track, index) in playlist.tracks.slice(0, 4)" 
                :key="index"
                :src="track.coverUrl"
                alt="Album cover"
              />
            </div>
            <div v-else class="cover-empty">
              <span>🎵</span>
            </div>
          </div>
          
          <div class="playlist-info">
            <h3>{{ playlist.name }}</h3>
            <p>{{ playlist.tracks.length }} tracks</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { usePlaylistsStore } from '~/stores/playlists';

const playlistsStore = usePlaylistsStore();
const { playlists } = storeToRefs(playlistsStore);

const showCreateForm = ref(false);
const newPlaylistName = ref('');
const isLoading = ref(false);

onMounted(async () => {
  await playlistsStore.fetchPlaylists();
});

const handleCreatePlaylist = async () => {
  isLoading.value = true;
  try {
    const playlist = await playlistsStore.createPlaylist(newPlaylistName.value);
    if (playlist) {
      showCreateForm.value = false;
      newPlaylistName.value = '';
    }
  } catch (error) {
    console.error('Failed to create playlist:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.playlists-page {
  padding: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  margin: 0;
  color: #fff;
}

.create-btn {
  background: #1DB954;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.create-btn:hover {
  background: #1ed760;
}

.create-playlist-form {
  background: #282828;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.form-header h2 {
  margin: 0;
  color: #fff;
}

.close-btn {
  background: transparent;
  border: none;
  color: #b3b3b3;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

.close-btn:hover {
  color: #fff;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.form-group label {
  color: #b3b3b3;
  font-size: 0.875rem;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #404040;
  border-radius: 4px;
  background: #404040;
  color: #fff;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #1DB954;
}

.submit-btn {
  background: #1DB954;
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background: #1ed760;
}

.submit-btn:disabled {
  background: #404040;
  cursor: not-allowed;
}

.no-playlists {
  text-align: center;
  padding: 4rem;
  color: #b3b3b3;
}

.playlists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.playlist-card {
  background: #282828;
  border-radius: 8px;
  overflow: hidden;
  transition: background 0.2s;
}

.playlist-card:hover {
  background: #383838;
}

.playlist-link {
  text-decoration: none;
  color: inherit;
}

.playlist-cover {
  aspect-ratio: 1;
  background: #404040;
  overflow: hidden;
}

.cover-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  height: 100%;
}

.cover-grid img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}

.playlist-info {
  padding: 1rem;
}

.playlist-info h3 {
  margin: 0 0 0.5rem;
  color: #fff;
  font-size: 1rem;
}

.playlist-info p {
  margin: 0;
  color: #b3b3b3;
  font-size: 0.875rem;
}
</style>
