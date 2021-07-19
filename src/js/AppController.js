import ApiController from "./ApiController";
import UiController from "./UiController";
import AppState from "./AppState";

export default class AppController {
  #uiController;
  #apiController;
  #appState;

  constructor() {
    this.#uiController = new UiController();
    this.#apiController = new ApiController();
    this.#appState = new AppState();
  }

  init() {
    this.loadCategories().then(() => {
      this.configureSearchPlaylistSection();
    });
  }

  async loadCategories() {
    const token = await this.#apiController.getToken();
    localStorage.setItem("token", token);
    const categories = await this.#apiController.getCategories(token);
    this.#uiController.insertCategories(categories);
  }

  configureSearchPlaylistSection() {
    document
      .querySelector(".custom-select-wrapper")
      .addEventListener("click", (e) => {
        document.querySelector(".custom-select").classList.toggle("open");
      });

    document.querySelectorAll(".custom-option").forEach((option) => {
      option.addEventListener("click", (e) => {
        if (!e.target.classList.contains("selected")) {
          const selectedOption = e.target.parentNode.querySelector(
            ".custom-option.selected"
          );
          if (selectedOption) {
            selectedOption.classList.remove("selected");
          }
          e.target.classList.add("selected");
          e.target
            .closest(".custom-select")
            .querySelector(
              ".custom-select__trigger .custom-select__text"
            ).textContent = e.target.textContent;
        }
      });
    });

    window.addEventListener("click", (e) => {
      const select = document.querySelector(".custom-select");
      if (!select.contains(e.target)) {
        select.classList.remove("open");
      }
    });

    document
      .querySelector(this.#uiController.domElements.submitBtn)
      .addEventListener("click", async (e) => {
        e.preventDefault();
        const selectedCategory = document.querySelector(
          ".custom-option.selected"
        );

        if (selectedCategory) {
          this.#appState.setCategory(selectedCategory.dataset.name);
          this.#uiController.removePlaylistsList();
          const token = localStorage.getItem("token");
          const categoryId = selectedCategory.dataset.id;
          const playlists = await this.#apiController.getPlaylistsByCategory(
            token,
            categoryId,
            10
          );
          this.#appState.setPlaylists(playlists);
          this.#uiController.removePlaylistsList();
          this.#uiController.showPlaylistsList(playlists);
          this.configurePlaylistsListSection();
        }
      });
  }

  configurePlaylistsListSection() {
    document
      .querySelectorAll(".playlists-list__playlist")
      .forEach((playlist) => {
        playlist.addEventListener("click", async (e) => {
          let selectedPlaylistName;

          if (e.target.classList.contains("playlists-list__playlist")) {
            selectedPlaylistName = e.target.dataset.name;
          } else {
            selectedPlaylistName = e.target.parentNode.dataset.name;
          }

          const selectedPlaylist =
            this.#appState.getPlaylistByName(selectedPlaylistName);
          const token = localStorage.getItem("token");
          const tracks = await this.#apiController.getTracksFromPlaylist(
            token,
            selectedPlaylist.tracks.href,
            10
          );
          this.#uiController.removePlaylistsList();
          this.#uiController.removeSearchPlaylist();
          this.#uiController.removePlaylistDetails();
          this.#uiController.showPlaylistDetails(selectedPlaylist, tracks);
          this.configurePlaylistDetailsSection();
        });
      });
  }

  configurePlaylistDetailsSection() {
    document
      .querySelector(".playlist-details__btn")
      .addEventListener("click", async (e) => {
        this.#uiController.removePlaylistDetails();
        this.#uiController.showSearchPlaylist();
        this.#uiController.showPlaylistsList(this.#appState.getPlaylists());
        await this.loadCategories();
        this.configurePlaylistsListSection();
        this.configureSearchPlaylistSection();
        document
          .querySelector(
            `.custom-option[data-name="${this.#appState.getCategory()}"]`
          )
          .classList.add("selected");
        document.querySelector(".custom-select__text").textContent =
          this.#appState.getCategory();
      });
  }
}
