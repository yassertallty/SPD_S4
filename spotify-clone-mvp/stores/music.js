import { defineStore } from 'pinia';

export const useMusicStore = defineStore('music', {
  state: () => ({
    currentTrack: null,
    isPlaying: false,
    queue: [],
    volume: 1,
    progress: 0,
    duration: 0
  }),

  getters: {
    nextTrack: (state) => {
      if (!state.currentTrack || state.queue.length === 0) return null;
      const currentIndex = state.queue.findIndex(track => track.id === state.currentTrack.id);
      return state.queue[currentIndex + 1] || null;
    },
    
    previousTrack: (state) => {
      if (!state.currentTrack || state.queue.length === 0) return null;
      const currentIndex = state.queue.findIndex(track => track.id === state.currentTrack.id);
      return state.queue[currentIndex - 1] || null;
    }
  },

  actions: {
    playTrack(track) {
      this.currentTrack = track;
      this.isPlaying = true;
      // In a real app, this would interact with an audio player
    },

    pauseTrack() {
      this.isPlaying = false;
      // In a real app, this would pause the audio player
    },

    resumeTrack() {
      this.isPlaying = true;
      // In a real app, this would resume the audio player
    },

    setQueue(tracks) {
      this.queue = tracks;
    },

    addToQueue(track) {
      this.queue.push(track);
    },

    removeFromQueue(trackId) {
      this.queue = this.queue.filter(track => track.id !== trackId);
    },

    playNext() {
      const next = this.nextTrack;
      if (next) {
        this.playTrack(next);
      }
    },

    playPrevious() {
      const previous = this.previousTrack;
      if (previous) {
        this.playTrack(previous);
      }
    },

    setVolume(value) {
      this.volume = Math.max(0, Math.min(1, value));
      // In a real app, this would set the audio player volume
    },

    setProgress(value) {
      this.progress = Math.max(0, Math.min(this.duration, value));
      // In a real app, this would seek the audio player
    },

    setDuration(value) {
      this.duration = value;
    }
  }
});
