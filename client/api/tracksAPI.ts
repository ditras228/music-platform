import {instance} from './index'

export const TracksAPI= {
    getTracks(token) {
        return instance.get('/tracks',
            {headers: {Authorization: `Bearer ${token}`}})
    },
    searchTracks(query, token) {
        return instance.get('/tracks/search?query='+query,
            {headers: {Authorization: `Bearer ${token}`}})
    },
    getOne(params,token){

        return instance.get('/tracks/'+params,
            {headers: {Authorization: `Bearer ${token}`}})
    },
    deleteOne(params,token){
        return instance.delete('/tracks/'+params,
            {headers: {Authorization: `Bearer ${token}`}})
    },
    createTrack(data, token) {
        let formData = new FormData()
        formData.append('name', data.name)
        formData.append('artist', data.artist)
        formData.append('text', data.text)
        formData.append('picture', data.picture)
        formData.append('audio', data.audio)
        return instance.post('/tracks', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
    },
    addComment(data, token){
        return instance.post('/tracks/comment', data,
            {headers: {Authorization: `Bearer ${token}`}})

    },
    createAlbum(data, token) {
        let formData = new FormData()
        formData.append('name', data.name)
        formData.append('artist', data.artist)
        formData.append('text', data.text)
        formData.append('picture', data.picture)
        formData.append('albumTracks', data.albumTracks)
        return instance.post('/albums', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
    },
    addTracks(data, token){
        let formData = new FormData()
        formData.append('name', data.albumId)
        formData.append('name', data.tracksId)

        return instance.post('/albums/addTracks', data,
            {headers: {Authorization: `Bearer ${token}`}})

    },
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
}