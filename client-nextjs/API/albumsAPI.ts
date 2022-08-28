import { instance } from "./index";
import FormData from "form-data";

export const AlbumsAPI = {
  getAlbums(token, page): any {
    let formData = new FormData();
    formData.append("search", "");

    return instance.post(`/albums?page=${page}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  searchAlbums(query, token, page) {
    let formData = new FormData();
    formData.append("search", query);
    formData.append("page", page);

    return instance.post(`/albums/?page=${page}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getOneAlbum(params, token, page: number) {
    let formData = new FormData();
    formData.append("page", 1);

    return instance.post(`/albums/${params}?page=${page}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  next(params, page, token?): any {
    let formData = new FormData();
    formData.append("page", page);

    return instance.post(`/albums/${params}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  deleteOneAlbum(params, token) {
    return instance.delete("/albums/" + params, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  createAlbum(data, token) {
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("author", data.author);
    formData.append("image", data.picture);
    formData.append("tracks", data.tracks);
    return instance.post("/album/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  addComment(data, token) {
    return instance.post("/comment", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
