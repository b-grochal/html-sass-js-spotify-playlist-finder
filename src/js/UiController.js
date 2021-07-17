import HtmlFactory from "./HtmlFactory";

export default class UiController {
  #domElements;
  #htmlfactory;

  constructor() {
    this.#domElements = {
      categoryOptions: "#category_options",
      submitBtn: "#submit_btn",
      main: "#main",
      customSelectWrapper: ".custom-select-wrapper",
      customSelect: ".customSelect",
    };
    this.#htmlfactory = new HtmlFactory();
  }

  get domElements() {
    return this.#domElements;
  }

  insertCategories(categories) {
    console.log(categories);
    const categoriesHtml =
      this.#htmlfactory.generateCategoriesOptions(categories);
    console.log(categoriesHtml);
    document
      .querySelector(this.#domElements.categoryOptions)
      .insertAdjacentHTML("beforeend", categoriesHtml);
  }

  showPlaylistsList(playlists) {
    const playlistsListHtml =
      this.#htmlfactory.generatePlaylistsListSection(playlists);
    document
      .querySelector(this.#domElements.main)
      .insertAdjacentHTML("beforeend", playlistsListHtml);
  }

  showPlaylistDetails(playlist, tracks) {
    const playlistDetailsHtml =
      this.#htmlfactory.generatePlaylistDetailsSection(playlist, tracks);
    document
      .querySelector(this.#domElements.main)
      .insertAdjacentHTML("beforeend", playlistDetailsHtml);
  }

  removePlaylistsList() {
    const playlistsList = document.querySelector(".playlists-list");
    if (playlistsList) {
      playlistsList.remove();
    }
  }
}
