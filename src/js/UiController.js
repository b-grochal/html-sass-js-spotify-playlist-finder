export default class UiController {
  // read-only private property
  #domElements = {
    categorySelect: "#category_select",
    submitBtn: "#submit_btn",
    main: "#main",
  };

  get domElements() {
    return this.#domElements;
  }

  insertCategories(categories) {
    console.log(categories);
  }
}
