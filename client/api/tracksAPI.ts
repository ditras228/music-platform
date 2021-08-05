import {instance} from './index'

export const TracksAPI= {
    getTracks(token) {
        return instance.get('/tracks',
            {headers: {Authorization: `Bearer ${token}`}})
    },
    searchTracks(query, token) {
        return instance.get('/tracks/search?query=' + query,
            {headers: {Authorization: `Bearer ${token}`}})
    },
    getOne(params, token) {

        return instance.get('/tracks/' + params,
            {headers: {Authorization: `Bearer ${token}`}})
    },
    deleteOne(params, token) {
        return instance.delete('/tracks/' + params,
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
    addComment(data, token) {
        return instance.post('/tracks/comment', data,
            {headers: {Authorization: `Bearer ${token}`}})

    },
    listen(id) {
        return instance.post(`/listen/${id}`)

    },
}