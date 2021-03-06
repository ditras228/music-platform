import {instance} from './index'
import {TracksAPI} from "./tracksAPI";
import {TrackActionTypes} from "../types/track";
import {AlbumActionTypes} from "../types/album";

export const AlbumsAPI= {
    getAlbums(token) {
        return instance.get('/albums',
            {headers: {Authorization: `Bearer ${token}`}})
    },
    searchAlbums(query, token) {
        return instance.get('/albums/search?query='+query,
            {headers: {Authorization: `Bearer ${token}`}})
    },
    getOneAlbum(params,token){

        return instance.get('/albums/'+params,
            {headers: {Authorization: `Bearer ${token}`}})
    },
    deleteOneAlbum(params,token){
        return instance.delete('/albums/'+params,
            {headers: {Authorization: `Bearer ${token}`}})
    },
    createAlbum(data, token) {
        let formData = new FormData()
        formData.append('name', data.name)
        formData.append('author', data.author)
        formData.append('text', data.text)
        formData.append('picture', data.picture)
        formData.append('tracks', data.tracks)
        return instance.post('/albums', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
    },
    editAlbum(tracksId, token){
        return instance.post('/albums/edit', tracksId,
            {headers: {Authorization: `Bearer ${token}`}})

    },
     addComment(data, token) {
        return instance.post('/albums/comment', data,
        {headers: {Authorization: `Bearer ${token}`}})

},
}
