import axios from 'axios'
export const baseURL= 'http://localhost:5002/'

export const instance = axios.create({
    baseURL: baseURL
})
