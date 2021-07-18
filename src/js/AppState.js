export default class AppState {
  #playlists;
  #category;

  setCategory(category) {
    this.#category = category;
  }

  getCategory() {
    return this.#category;
  }

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
