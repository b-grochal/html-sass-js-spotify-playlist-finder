export default class AppState {
  #playlists;

  setPlaylists(playlists) {
    this.#playlists = playlists;
  }

  getPlaylists() {
    return this.#playlists;
  }

  getPlaylistByName(playlistName) {
    return this.#playlists.find((playlist) => playlist.name === playlistName);
  }
}
