<template>
  <div class="music-player" v-if="currentTrack">
    <div class="player-left">
      <img :src="currentTrack.coverUrl" :alt="currentTrack.title" class="current-track-cover" />
      <div class="current-track-info">
        <h3>{{ currentTrack.title }}</h3>
        <p>{{ currentTrack.artist }}</p>
      </div>
    </div>
    
    <div class="player-center">
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
      
      <div class="progress-bar">
        <span class="current-time">{{ formatDuration(progress) }}</span>
        <div class="progress-track" @click="seek">
          <div class="progress-fill" :style="{ width: `${(progress / duration) * 100}%` }"></div>
        </div>
        <span class="total-time">{{ formatDuration(duration) }}</span>
      </div>
    </div>
    
    <div class="player-right">
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
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useMusicStore } from '~/stores/music';
import { formatDuration } from '~/utils/mockData';

const musicStore = useMusicStore();
const { currentTrack, isPlaying, progress, duration, volume: storeVolume } = storeToRefs(musicStore);

const volume = ref(storeVolume.value);

watch(storeVolume, (newValue) => {
  volume.value = newValue;
});

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
  const progressTrack = event.currentTarget;
  const clickPosition = event.offsetX;
  const progressTrackWidth = progressTrack.offsetWidth;
  const seekPercentage = clickPosition / progressTrackWidth;
  const seekTime = seekPercentage * duration.value;
  musicStore.setProgress(seekTime);
};

const setVolume = () => {
  musicStore.setVolume(volume.value);
};
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
  background: #181818;
  border-top: 1px solid #282828;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  z-index: 1000;
}

.player-left {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 30%;
}

.current-track-cover {
  width: 56px;
  height: 56px;
  border-radius: 4px;
  object-fit: cover;
}

.current-track-info h3 {
  margin: 0;
  font-size: 0.875rem;
  color: #fff;
}

.current-track-info p {
  margin: 0;
  font-size: 0.75rem;
  color: #b3b3b3;
}

.player-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 40%;
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
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
  font-size: 2rem;
}

.progress-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  color: #b3b3b3;
  font-size: 0.75rem;
}

.progress-track {
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

.player-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 30%;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #b3b3b3;
}

.volume-slider {
  width: 100px;
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
</style>
