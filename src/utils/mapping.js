const mappingSongInPlaylistFromDB = (song) => ({
  id: song.id,
  title: song.title,
  performer: song.performer,
});

module.exports = { mappingSongInPlaylistFromDB };
