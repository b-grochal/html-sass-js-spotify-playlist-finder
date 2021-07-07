export default class HtmlFactory {
  generateCategoriesOptions(categories) {
    const html = [];
    categories.forEach((category) =>
      html.push(
        `<span class="custom-option" data-id="${category.id}" data-name="${category.name}">${category.name}</span>`
      )
    );
    return html.join("\n");
  }
}
