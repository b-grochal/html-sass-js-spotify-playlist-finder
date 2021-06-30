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
  }

  async loadCategories() {
    const token = await this.#apiController.getToken();
    localStorage.setItem("token", token);
    const categories = await this.#apiController.getCategories(token);
    this.#uiController.insertCategories(categories);
  }
}
