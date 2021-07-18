import { convertMilisecondsToMinutesString } from "./helpers";

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

  generateSearchPlaylistSection() {
    const searchPlaylistHtml = [
      '<section class="search-playlist">',
      '<form class="search-playlist__form">',
      '<div class="custom-select-wrapper">',
      '<div class="custom-select">',
      '<div class="custom-select__trigger">',
      '<span class="custom-select__text">Select category</span>',
      '<div class="arrow"></div>',
      "</div>",
      '<div class="custom-options" id="category_options"></div>',
      "</div>",
      "</div>",
      '<input type="submit" id="submit_btn" class="search-playlist__btn" value="Search" />',
      "</form>",
      "</section>",
    ];

    return searchPlaylistHtml.join("\n");
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

  generatePlaylistDetailsSection(playlist, tracks) {
    const tracksHtml = [];
    tracks.forEach((track) =>
      tracksHtml.push(
        `
      <a class="playlist-details__track">
        <span class="playlist-details__track-description">${
          track.track.name
        } - ${track.track.artists[0].name}</span>
        <span class="playlist-details__track-duration">${convertMilisecondsToMinutesString(
          track.track.duration_ms
        )}</span>
      </a>
      `
      )
    );

    return [
      '<section class="playlist-details">',
      '<header class="playlist-details__header">',
      `<img class="playlist-details__playlist-image" src="${playlist.images[0].url}">`,
      `<h2 class="playlist-details__playlist-name">${playlist.name}</h2>`,
      "</header>",
      '<section class="playlist-details__tracks">',
      ...tracksHtml,
      "</section>",
      '<section class="playlist-details__controls">',
      '<button class="playlist-details__btn">Back</button>',
      "</section>",
      "</section>",
    ].join("\n");
  }
}
