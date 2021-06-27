const ApiController = (function () {
  const clientId = "CLIENT ID";
  const clientSecret = "CLIENT SECRET";

  const _getToken = async () => {
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
  };

  const _getCategories = async (token) => {
    const result = await fetch(`https://api.spotify.com/v1/browse/categories`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    const data = await result.json();
    return data.categories.items;
  };

  const _getPlaylistsByCategory = async (token, categoryId, limit) => {
    //const limit = 10;

    const result = await fetch(
      `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?limit=${limit}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await result.json();
    return data.playlists.items;
  };

  return {
    getToken() {
      return _getToken();
    },
    getCategpries() {
      return _getCategories();
    },
    getPlaylistByCategory() {
      return _getPlaylistsByCategory();
    },
  };
})();
