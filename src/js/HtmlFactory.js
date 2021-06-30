export default class HtmlFactory {
  generateCategoriesOptions(categories) {
    const html = [];
    categories.forEach((category) =>
      html.push(`<option value="${category.id}">${category.name}</option>`)
    );
    return html.join("\n");
  }
}
