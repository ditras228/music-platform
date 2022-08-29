import { instance } from "./index";
import FormData from "form-data";

export const TracksAPI = {
  getTracks(token, page): any {
    let formData = new FormData();
    formData.append("search", "");

    return instance.post(`/tracks?page=${page}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getOne(params, token?): any {
    let formData = new FormData();
    formData.append("page", 1);

    return instance.post(`/tracks/${params}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  next(params, page, token?): any {
    let formData = new FormData();
    formData.append("page", page);

    return instance.post(`/tracks/${params}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  deleteOne(params, token): any {
    return instance.delete("/tracks/" + params, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  searchTracks(query, token, page): any {
    let formData = new FormData();
    formData.append("search", query);

    return instance.post(`/tracks?page=${page}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  createTrack(data, token): any {
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("artist", data.artist);
    formData.append("lyrics", data.text);
    formData.append("image", data.picture);
    formData.append("audio", data.audio);

    return instance.post("/track/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  addComment(data, token): any {
    return instance.post("/comment", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  listen(id, token, album_id?): any {
    let formData = new FormData();
    formData.append("album_id", album_id);

    return instance.post(`/listen/${id}?_method=put`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
