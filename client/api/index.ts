import axios from 'axios'

export const baseURL= 'http://localhost:8000/'
export const filesURL= 'http://localhost:8000/storage/'
export const instance = axios.create({
    baseURL: baseURL
})
