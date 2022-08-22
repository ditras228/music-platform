import {instance} from './index'

export const AlbumsAPI = {
    getAlbums(token) {
        return instance.get('/album',
            {headers: {Authorization: `Bearer ${token}`}})
    },

    searchAlbums(query, token) {
        return instance.get('/album/search?query=' + query,
            {headers: {Authorization: `Bearer ${token}`}})
    },

    getOneAlbum(params, token) {

        return instance.get('/album/' + params,
            {headers: {Authorization: `Bearer ${token}`}})
    },

    deleteOneAlbum(params, token) {
        return instance.delete('/album/' + params,
            {headers: {Authorization: `Bearer ${token}`}})
    },

    createAlbum(data, token) {
        let formData = new FormData()
        formData.append('name', data.name)
        formData.append('author', data.author)
        formData.append('image', data.picture)
        formData.append('tracks', data.tracks)
        return instance.post('/album', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
    },

    addComment(data, token) {
        return instance.post('/comment', data,
            {headers: {Authorization: `Bearer ${token}`}})
    },
}
