import { defineStore } from 'pinia';

export const usePlaylistsStore = defineStore('playlists', {
  state: () => ({
    playlists: [],
    currentPlaylist: null
  }),

  actions: {
    async fetchPlaylists() {
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        this.playlists = [
          {
            id: '1',
            name: 'My Favorites',
            tracks: []
          },
          {
            id: '2',
            name: 'Workout Mix',
            tracks: []
          }
        ];
      } catch (error) {
        console.error('Failed to fetch playlists:', error);
      }
    },

    async fetchPlaylist(id) {
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        const playlist = this.playlists.find(p => p.id === id);
        if (playlist) {
          this.currentPlaylist = playlist;
        } else {
          this.currentPlaylist = null;
        }
      } catch (error) {
        console.error('Failed to fetch playlist:', error);
        this.currentPlaylist = null;
      }
    },

    async createPlaylist(name) {
      try {
        // In a real app, this would be an API call
        const newPlaylist = {
          id: Date.now().toString(),
          name,
          tracks: []
        };
        
        this.playlists.push(newPlaylist);
        return newPlaylist;
      } catch (error) {
        console.error('Failed to create playlist:', error);
        return null;
      }
    },

    async deletePlaylist(id) {
      try {
        // In a real app, this would be an API call
        this.playlists = this.playlists.filter(p => p.id !== id);
        if (this.currentPlaylist?.id === id) {
          this.currentPlaylist = null;
        }
      } catch (error) {
        console.error('Failed to delete playlist:', error);
      }
    },

    async addTrackToPlaylist(playlistId, track) {
      try {
        // In a real app, this would be an API call
        const playlist = this.playlists.find(p => p.id === playlistId);
        if (playlist) {
          playlist.tracks.push(track);
          if (this.currentPlaylist?.id === playlistId) {
            this.currentPlaylist = { ...playlist };
          }
        }
      } catch (error) {
        console.error('Failed to add track to playlist:', error);
      }
    },

    async removeTrackFromPlaylist(playlistId, trackId) {
      try {
        // In a real app, this would be an API call
        const playlist = this.playlists.find(p => p.id === playlistId);
        if (playlist) {
          playlist.tracks = playlist.tracks.filter(t => t.id !== trackId);
          if (this.currentPlaylist?.id === playlistId) {
            this.currentPlaylist = { ...playlist };
          }
        }
      } catch (error) {
        console.error('Failed to remove track from playlist:', error);
      }
    }
  }
});
