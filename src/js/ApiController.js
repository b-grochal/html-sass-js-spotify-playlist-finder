import { CLIENT_ID, CLIENT_SECRET } from "./spotifyApiConfig";

export default class ApiController {
  #clientId = CLIENT_ID; // private property
  #clientSecret = CLIENT_SECRET; // private property

  async getToken() {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });

    const data = await result.json();
    return data.access_token;
  }

  async getCategories(token) {
    const result = await fetch(`https://api.spotify.com/v1/browse/categories`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    const data = await result.json();
    return data.categories.items;
  }

  async getPlaylistsByCategory(token, categoryId, limit) {
    const result = await fetch(
      `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?limit=${limit}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await result.json();
    return data.playlists.items;
  }
}
