export const mockTracks = [
  {
    id: '1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    duration: 354,
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b',
    audioUrl: 'https://example.com/bohemian-rhapsody.mp3'
  },
  {
    id: '2',
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    album: 'Led Zeppelin IV',
    duration: 482,
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273c6f7af36bcd24e41e56360b1',
    audioUrl: 'https://example.com/stairway-to-heaven.mp3'
  },
  {
    id: '3',
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    duration: 390,
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f',
    audioUrl: 'https://example.com/hotel-california.mp3'
  },
  {
    id: '4',
    title: 'Sweet Child O\' Mine',
    artist: 'Guns N\' Roses',
    album: 'Appetite for Destruction',
    duration: 356,
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273e8dd4db47e7177c63b0b7d53',
    audioUrl: 'https://example.com/sweet-child-o-mine.mp3'
  },
  {
    id: '5',
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    album: 'Nevermind',
    duration: 301,
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273a108e07c661f9fc54de9c43a',
    audioUrl: 'https://example.com/smells-like-teen-spirit.mp3'
  }
];

export const mockPlaylists = [
  {
    id: '1',
    name: 'Classic Rock',
    tracks: [mockTracks[0], mockTracks[1], mockTracks[2]]
  },
  {
    id: '2',
    name: '90s Hits',
    tracks: [mockTracks[4]]
  }
];

export const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
