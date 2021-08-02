import axios from 'axios'
export const baseURL= 'http://87.236.22.121:5002/'
export const baseSocketURL= 'http://87.236.22.121:4001/'
export const instance = axios.create({
    baseURL: baseURL
})
