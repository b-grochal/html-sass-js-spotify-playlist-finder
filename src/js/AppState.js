export default class AppState {
  #playlists;

  setPlaylists(playlists) {
    this.#playlists = playlists;
  }

  getPlaylistByName(playlistName) {
    return this.#playlists.find((playlist) => playlist.name === playlistName);
  }
}
