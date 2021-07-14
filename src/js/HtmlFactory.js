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

  generatePlaylistsListSection(playlists) {
    const playlistsHtml = [];

    playlists.forEach((playlist) =>
      playlistsHtml.push(
        `
    <a class="playlists-list__playlist" data-name="${playlist.name}">
      <img class="playlists-list__img" src="${playlist.images[0].url}">
      <span class="playlists-list__name">${playlist.name}</span>
    </a>
    `
      )
    );

    return [
      '<section class="playlists-list">',
      ...playlistsHtml,
      "</section>",
    ].join("\n");
  }
}
