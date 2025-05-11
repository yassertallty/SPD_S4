<template>
  <div class="track-item" @click="playTrack">
    <div class="track-info">
      <img :src="track.coverUrl" :alt="track.title" class="track-cover" />
      <div class="track-details">
        <h3>{{ track.title }}</h3>
        <p>{{ track.artist }}</p>
      </div>
    </div>
    
    <div class="track-album">
      <p>{{ track.album }}</p>
    </div>
    
    <div class="track-duration">
      <p>{{ formatDuration(track.duration) }}</p>
    </div>
  </div>
</template>

<script setup>
import { useMusicStore } from '~/stores/music';
import { formatDuration } from '~/utils/mockData';

const props = defineProps({
  track: {
    type: Object,
    required: true
  }
});

const musicStore = useMusicStore();

const playTrack = () => {
  musicStore.playTrack(props.track);
};
</script>

<style scoped>
.track-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.track-item:hover {
  background-color: #282828;
}

.track-info {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 1rem;
}

.track-cover {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
}

.track-details {
  display: flex;
  flex-direction: column;
}

.track-details h3 {
  margin: 0;
  font-size: 1rem;
  color: #fff;
}

.track-details p {
  margin: 0;
  font-size: 0.875rem;
  color: #b3b3b3;
}

.track-album {
  flex: 1;
  padding: 0 1rem;
}

.track-album p {
  margin: 0;
  font-size: 0.875rem;
  color: #b3b3b3;
}

.track-duration {
  padding: 0 1rem;
}

.track-duration p {
  margin: 0;
  font-size: 0.875rem;
  color: #b3b3b3;
}
</style>
