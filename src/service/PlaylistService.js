const { Pool } = require('pg');
const { mappingSongInPlaylistFromDB } = require('../utils/mapping');
const NotFoundError = require('../exceptions/NotFoundError');

class PlaylistService {
  constructor() {
    this.pool = new Pool();
  }

  async getPlaylistWithSongs(playlistId) {
    const playlist = await this.playlistById(playlistId);

    const songs = await this.getSongInPlaylist(playlistId);

    return {
      playlist: {
        ...playlist,
        songs,
      },
    };
  }

  async playlistById(playlistId) {
    const query = {
      text: `SELECT playlists.id, playlists.name FROM playlists
        WHERE playlists.id = $1`,
      values: [playlistId],
    };

    const result = await this.pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    return result.rows[0];
  }

  async getSongInPlaylist(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer FROM songs
        LEFT JOIN playlist_songs ON playlist_songs.song_id = songs.id
        WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this.pool.query(query);

    return result.rows.map(mappingSongInPlaylistFromDB);
  }
}

module.exports = PlaylistService;
