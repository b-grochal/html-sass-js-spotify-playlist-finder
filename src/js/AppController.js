import ApiController from "./ApiController";
import UiController from "./UiController";

export default class AppController {
  #uiController = new UiController();
  #apiController = new ApiController();
  init() {
    console.log("Running the app.");
  }

  async loadCategories() {
    const token = await this.#apiController.getToken();
    localStorage.setItem("token", token);
    const categories = await this.#apiController.getCategories(token);
    this.#uiController.insertCategories(categories);
  }
}
