<template>
  <div class="player-page">
    <h1>Now Playing</h1>
    
    <div v-if="currentTrack" class="current-track">
      <div class="track-info">
        <img :src="currentTrack.coverUrl" :alt="currentTrack.title" class="track-cover" />
        <div class="track-details">
          <h2>{{ currentTrack.title }}</h2>
          <p>{{ currentTrack.artist }}</p>
          <p class="album">{{ currentTrack.album }}</p>
        </div>
      </div>

      <div class="track-actions">
        <button 
          @click="toggleFavorite" 
          class="action-btn"
          :class="{ 'is-favorite': isFavorite }"
        >
          <span>{{ isFavorite ? '❤️' : '🤍' }}</span>
          {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
        </button>
        
        <div class="playlist-dropdown">
          <button @click="showPlaylistMenu = !showPlaylistMenu" class="action-btn">
            <span>➕</span>
            Add to Playlist
          </button>
          
          <div v-if="showPlaylistMenu" class="playlist-menu">
            <div v-if="playlists.length === 0" class="no-playlists">
              <p>No playlists found</p>
              <NuxtLink to="/playlists" class="create-playlist-btn">
                Create Playlist
              </NuxtLink>
            </div>
            
            <div v-else class="playlist-list">
              <div 
                v-for="playlist in playlists" 
                :key="playlist.id"
                class="playlist-item"
                @click="addToPlaylist(playlist.id)"
              >
                <span>🎵</span>
                <span>{{ playlist.name }}</span>
                <span class="track-count">{{ playlist.tracks.length }} tracks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="player-controls">
        <button @click="playPrevious" class="control-btn">
          <span>⏮</span>
        </button>
        <button @click="togglePlay" class="control-btn play-btn">
          <span>{{ isPlaying ? '⏸' : '▶' }}</span>
        </button>
        <button @click="playNext" class="control-btn">
          <span>⏭</span>
        </button>
      </div>
      
      <div class="progress-container">
        <span class="current-time">{{ formatDuration(progress) }}</span>
        <div class="progress-bar" @click="seek">
          <div class="progress-fill" :style="{ width: `${(progress / duration) * 100}%` }"></div>
        </div>
        <span class="total-time">{{ formatDuration(duration) }}</span>
      </div>
      
      <div class="volume-control">
        <span>🔊</span>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          v-model="volume" 
          @input="setVolume"
          class="volume-slider"
        />
      </div>
    </div>
    
    <div v-else class="no-track">
      <p>No track is currently playing.</p>
      <NuxtLink to="/" class="browse-btn">
        Browse Music
      </NuxtLink>
    </div>
    
    <div v-if="queue.length > 0" class="queue-section">
      <h2>Up Next</h2>
      <div class="queue-list">
        <div 
          v-for="(track, index) in queue" 
          :key="track.id"
          class="queue-item"
          :class="{ 'current': index === 0 }"
        >
          <div class="queue-track-info">
            <img :src="track.coverUrl" :alt="track.title" class="queue-track-cover" />
            <div class="queue-track-details">
              <h3>{{ track.title }}</h3>
              <p>{{ track.artist }}</p>
            </div>
          </div>
          <div class="queue-track-duration">
            <p>{{ formatDuration(track.duration) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useMusicStore } from '~/stores/music';
import { usePlaylistsStore } from '~/stores/playlists';
import { formatDuration } from '~/utils/mockData';

const musicStore = useMusicStore();
const playlistsStore = usePlaylistsStore();
const { currentTrack, isPlaying, progress, duration, queue, volume: storeVolume } = storeToRefs(musicStore);
const { playlists } = storeToRefs(playlistsStore);

const volume = ref(storeVolume.value);
const showPlaylistMenu = ref(false);
const isFavorite = ref(false);

// Check if the current track is in favorites
watch(currentTrack, (track) => {
  if (track) {
    // In a real app, this would check against a favorites list in the store
    isFavorite.value = false;
  }
});

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
  // In a real app, this would update the favorites in the store
  // For now, we'll just toggle the local state
};

const addToPlaylist = async (playlistId) => {
  if (currentTrack.value) {
    await playlistsStore.addTrackToPlaylist(playlistId, currentTrack.value);
    showPlaylistMenu.value = false;
  }
};

const togglePlay = () => {
  if (isPlaying.value) {
    musicStore.pauseTrack();
  } else {
    musicStore.resumeTrack();
  }
};

const playNext = () => {
  musicStore.playNext();
};

const playPrevious = () => {
  musicStore.playPrevious();
};

const seek = (event) => {
  const progressBar = event.currentTarget;
  const clickPosition = event.offsetX;
  const progressBarWidth = progressBar.offsetWidth;
  const seekPercentage = clickPosition / progressBarWidth;
  const seekTime = seekPercentage * duration.value;
  musicStore.setProgress(seekTime);
};

const setVolume = () => {
  musicStore.setVolume(volume.value);
};
</script>

<style scoped>
.player-page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 2rem;
  color: #fff;
}

.current-track {
  background: #282828;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.track-info {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.track-cover {
  width: 200px;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;
}

.track-details h2 {
  margin: 0 0 0.5rem;
  color: #fff;
  font-size: 1.5rem;
}

.track-details p {
  margin: 0;
  color: #b3b3b3;
}

.track-details .album {
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

.track-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 0 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 1px solid #b3b3b3;
  color: #b3b3b3;
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.action-btn:hover {
  border-color: #fff;
  color: #fff;
}

.action-btn.is-favorite {
  border-color: #1DB954;
  color: #1DB954;
}

.playlist-dropdown {
  position: relative;
}

.playlist-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  background: #282828;
  border-radius: 8px;
  min-width: 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.no-playlists {
  padding: 1rem;
  text-align: center;
  color: #b3b3b3;
}

.create-playlist-btn {
  display: inline-block;
  background: #1DB954;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  text-decoration: none;
  margin-top: 0.5rem;
  transition: background 0.2s;
}

.create-playlist-btn:hover {
  background: #1ed760;
}

.playlist-list {
  max-height: 300px;
  overflow-y: auto;
}

.playlist-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.playlist-item:hover {
  background: #383838;
}

.track-count {
  margin-left: auto;
  font-size: 0.75rem;
  color: #b3b3b3;
}

.player-controls {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.control-btn {
  background: transparent;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  transition: color 0.2s;
}

.control-btn:hover {
  color: #fff;
}

.play-btn {
  font-size: 2.5rem;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  color: #b3b3b3;
  font-size: 0.875rem;
}

.progress-bar {
  flex: 1;
  height: 4px;
  background: #4f4f4f;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

.progress-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: #1DB954;
  border-radius: 2px;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #b3b3b3;
}

.volume-slider {
  width: 150px;
  height: 4px;
  -webkit-appearance: none;
  background: #4f4f4f;
  border-radius: 2px;
  outline: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

.no-track {
  text-align: center;
  padding: 3rem;
  background: #282828;
  border-radius: 8px;
  color: #b3b3b3;
}

.browse-btn {
  display: inline-block;
  background: #1DB954;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  font-weight: bold;
  text-decoration: none;
  margin-top: 1rem;
  transition: background 0.2s;
}

.browse-btn:hover {
  background: #1ed760;
}

.queue-section {
  margin-top: 3rem;
}

.queue-section h2 {
  margin-bottom: 1rem;
  color: #fff;
}

.queue-list {
  background: #282828;
  border-radius: 8px;
  overflow: hidden;
}

.queue-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #383838;
}

.queue-item:last-child {
  border-bottom: none;
}

.queue-item.current {
  background: #383838;
}

.queue-track-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.queue-track-cover {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
}

.queue-track-details h3 {
  margin: 0 0 0.25rem;
  color: #fff;
  font-size: 0.875rem;
}

.queue-track-details p {
  margin: 0;
  color: #b3b3b3;
  font-size: 0.75rem;
}

.queue-track-duration {
  color: #b3b3b3;
  font-size: 0.75rem;
}
</style>
