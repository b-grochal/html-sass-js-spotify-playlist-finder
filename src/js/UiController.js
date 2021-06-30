import HtmlFactory from "./HtmlFactory";

export default class UiController {
  // read-only private property
  #domElements = {
    categorySelect: "#category_select",
    submitBtn: "#submit_btn",
    main: "#main",
  };
  #htmlfactory = new HtmlFactory();

  get domElements() {
    return this.#domElements;
  }

  insertCategories(categories) {
    console.log(categories);
    const categoriesHtml =
      this.#htmlfactory.generateCategoriesOptions(categories);
    console.log(categoriesHtml);
    document
      .querySelector(this.#domElements.categorySelect)
      .insertAdjacentHTML("beforeend", categoriesHtml);
  }
}
