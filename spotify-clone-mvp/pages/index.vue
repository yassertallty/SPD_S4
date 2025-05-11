<template>
  <div class="home-page">
    <section class="featured-section">
      <h2>Featured Tracks</h2>
      <div class="tracks-grid">
        <div 
          v-for="track in featuredTracks" 
          :key="track.id"
          class="track-card"
          @click="playTrack(track)"
        >
          <div class="track-cover">
            <img :src="track.coverUrl" :alt="track.title" />
            <button class="play-btn">▶</button>
          </div>
          <div class="track-info">
            <h3>{{ track.title }}</h3>
            <p>{{ track.artist }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="playlists-section">
      <h2>Your Playlists</h2>
      <div v-if="playlists.length === 0" class="no-playlists">
        <p>You don't have any playlists yet.</p>
        <NuxtLink to="/playlists" class="create-btn">
          Create Playlist
        </NuxtLink>
      </div>
      <div v-else class="playlists-grid">
        <div 
          v-for="playlist in playlists.slice(0, 6)" 
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
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { usePlaylistsStore } from '~/stores/playlists';
import { useMusicStore } from '~/stores/music';
import { mockTracks } from '~/utils/mockData';

const playlistsStore = usePlaylistsStore();
const musicStore = useMusicStore();
const { playlists } = storeToRefs(playlistsStore);

// For demo purposes, we'll use mock tracks as featured tracks
const featuredTracks = mockTracks;

onMounted(async () => {
  await playlistsStore.fetchPlaylists();
});

const playTrack = (track) => {
  musicStore.playTrack(track);
};
</script>

<style scoped>
.home-page {
  padding: 2rem;
}

section {
  margin-bottom: 3rem;
}

h2 {
  color: #fff;
  margin: 0 0 1.5rem;
}

.tracks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
}

.track-card {
  background: #282828;
  border-radius: 8px;
  padding: 1rem;
  transition: background 0.2s;
  cursor: pointer;
}

.track-card:hover {
  background: #383838;
}

.track-cover {
  position: relative;
  aspect-ratio: 1;
  margin-bottom: 1rem;
}

.track-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.play-btn {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  background: #1DB954;
  color: #fff;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.25rem;
  cursor: pointer;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.2s;
}

.track-card:hover .play-btn {
  opacity: 1;
  transform: translateY(0);
}

.play-btn:hover {
  background: #1ed760;
  transform: scale(1.1);
}

.track-info h3 {
  margin: 0 0 0.5rem;
  color: #fff;
  font-size: 1rem;
}

.track-info p {
  margin: 0;
  color: #b3b3b3;
  font-size: 0.875rem;
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

.no-playlists {
  text-align: center;
  padding: 2rem;
  color: #b3b3b3;
}

.create-btn {
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

.create-btn:hover {
  background: #1ed760;
}
</style>
