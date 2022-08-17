import {instance} from './index'

export const TracksAPI = {
    getTracks(token): any {
        return instance.get('/track',
            {headers: {Authorization: `Bearer ${token}`}})
    },

    getOne(params, token?): any {
        return instance.get('/track/' + params,
            {headers: {Authorization: `Bearer ${token}`}})
    },

    deleteOne(params, token): any {
        return instance.delete('/track/' + params,
            {headers: {Authorization: `Bearer ${token}`}})
    },

    searchTracks(query, token): any {
        return instance.get('/track/search?query=' + query,
            {headers: {Authorization: `Bearer ${token}`}})
    },

    createTrack(data, token): any {
        let formData = new FormData()
        formData.append('name', data.name)
        formData.append('artist', data.artist)
        formData.append('lyrics', data.text)
        formData.append('image', data.picture)
        formData.append('audio', data.audio)

        return instance.post('/track', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
    },

    addComment(data, token): any {
        return instance.post('/comment', data,
            {headers: {Authorization: `Bearer ${token}`}})
    },

    listen(id): any {
        return instance.put(`/listen/${id}`)
    },
}
