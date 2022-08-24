import axios from "axios";

export const baseURL = "http://localhost:8000/";
export const imagesURL = "http://localhost:8000/storage/";
export const audioURL = "http://localhost:8000/audio/";
export const instance = axios.create({
  baseURL: baseURL,
});
