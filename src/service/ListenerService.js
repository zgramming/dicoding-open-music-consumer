class ListenerService {
  constructor({ mailSenderService, playlistService }) {
    this.mailSenderService = mailSenderService;
    this.playlistService = playlistService;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const content = JSON.parse(message.content);
      const { playlistId, targetEmail } = content;
      const playlist = await this.playlistService.getPlaylistWithSongs(playlistId);
      const result = await this.mailSenderService.sendEmail(targetEmail, JSON.stringify(playlist));

      console.log('ListenerService.listen', result);
    } catch (error) {
      console.error({
        error,
        context: 'ListenerService.listen',
      });
    }
  }
}

module.exports = ListenerService;

// Path: src/service/ListenerService.js
