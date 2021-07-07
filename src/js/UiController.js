import HtmlFactory from "./HtmlFactory";

export default class UiController {
  #domElements;
  #htmlfactory;

  constructor() {
    this.#domElements = {
      categoryOptions: "#category_options",
      submitBtn: "#submit_btn",
      main: "#main",
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
}
