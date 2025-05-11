<template>
    <div>
      <div v-if="!isLoggedIn" class="not-logged-in">
        <p>Please login to view this playlist.</p>
        <NuxtLink to="/login">
          <button>Login</button>
        </NuxtLink>
      </div>
      
      <div v-else-if="!currentPlaylist" class="not-found">
        <p>Playlist not found.</p>
        <NuxtLink to="/playlists">
          <button>Back to Playlists</button>
        </NuxtLink>
      </div>
      
      <div v-else class="playlist-detail">
        <div class="playlist-header">
          <div class="playlist-cover">
            <div v-if="currentPlaylist.tracks.length > 0" class="cover-grid">
              <img 
                v-for="(track, index) in coverTracks" 
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
            <h1>{{ currentPlaylist.name }}</h1>
            <p>{{ currentPlaylist.tracks.length }} tracks</p>
            
            <div class="playlist-actions">
              <button 
                v-if="currentPlaylist.tracks.length > 0" 
                @click="playPlaylist"
              >
                Play
              </button>
            </div>
          </div>
        </div>
        
        <div class="playlist-tracks">
          <h2>Tracks</h2>
          
          <div v-if="currentPlaylist.tracks.length === 0" class="no-tracks">
            <p>This playlist is empty.</p>
            <NuxtLink to="/">
              <button>Browse Music</button>
            </NuxtLink>
          </div>
          
          <div v-else>
            <div 
              v-for="track in currentPlaylist.tracks" 
              :key="track.id"
              class="playlist-track-item"
            >
              <TrackItem :track="track" />
              <button 
                @click="removeTrack(track.id)" 
                class="remove-btn"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { usePlaylistsStore } from '~/stores/playlists';
  import { useMusicStore } from '~/stores/music';
  import TrackItem from '~/components/Music/TrackItem.vue';
  
  const route = useRoute();
  const router = useRouter();
  const playlistsStore = usePlaylistsStore();
  const musicStore = useMusicStore();
  
  const { currentPlaylist } = storeToRefs(playlistsStore);
  
  // Get up to 4 tracks for the cover grid
  const coverTracks = computed(() => {
    if (!currentPlaylist.value) return [];
    return currentPlaylist.value.tracks.slice(0, 4);
  });

  const playPlaylist = () => {
    if (currentPlaylist.value?.tracks.length > 0) {
      musicStore.setQueue(currentPlaylist.value.tracks);
      musicStore.playTrack(currentPlaylist.value.tracks[0]);
    }
  };

  const removeTrack = (trackId) => {
    playlistsStore.removeTrackFromPlaylist(currentPlaylist.value.id, trackId);
  };

  onMounted(async () => {
    const playlistId = route.params.id;
    await playlistsStore.fetchPlaylist(playlistId);
  });

  watch(() => route.params.id, async (newId) => {
    await playlistsStore.fetchPlaylist(newId);
  });
</script>

<style scoped>
.playlist-detail {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.playlist-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.playlist-cover {
  width: 300px;
  height: 300px;
  background: #282828;
  border-radius: 8px;
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
  font-size: 4rem;
}

.playlist-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.playlist-info h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.playlist-actions {
  margin-top: 1rem;
}

.playlist-actions button {
  padding: 0.75rem 2rem;
  background: #1DB954;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.playlist-actions button:hover {
  background: #1ed760;
}

.playlist-tracks {
  margin-top: 2rem;
}

.playlist-track-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 4px;
}

.playlist-track-item:hover {
  background: #282828;
}

.remove-btn {
  padding: 0.5rem 1rem;
  background: transparent;
  color: #b3b3b3;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.remove-btn:hover {
  color: #fff;
}

.not-logged-in,
.not-found,
.no-tracks {
  text-align: center;
  padding: 2rem;
}

.not-logged-in button,
.not-found button,
.no-tracks button {
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  background: #1DB954;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.not-logged-in button:hover,
.not-found button:hover,
.no-tracks button:hover {
  background: #1ed760;
}
</style>