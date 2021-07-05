import ApiController from "./ApiController";
import UiController from "./UiController";

export default class AppController {
  #uiController;
  #apiController;

  constructor() {
    this.#uiController = new UiController();
    this.#apiController = new ApiController();
  }

  init() {
    console.log("Running the app.");
    this.loadCategories();
    this.configureSearchPlaylistSection();
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
      .addEventListener("click", function () {
        this.querySelector(".custom-select").classList.toggle("open");
      });

    for (const option of document.querySelectorAll(".custom-option")) {
      option.addEventListener("click", function () {
        if (!this.classList.contains("selected")) {
          this.parentNode
            .querySelector(".custom-option.selected")
            .classList.remove("selected");
          this.classList.add("selected");
          this.closest(".custom-select").querySelector(
            ".custom-select__trigger .custom-select__text"
          ).textContent = this.textContent;
        }
      });
    }

    window.addEventListener("click", function (e) {
      const select = document.querySelector(".custom-select");
      if (!select.contains(e.target)) {
        select.classList.remove("open");
      }
    });
  }
}
