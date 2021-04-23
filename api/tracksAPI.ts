import {instance} from './index'

export const TracksAPI= {
    getTracks() {
        return instance.get('/tracks')
    },
    searchTracks(query) {
        return instance.get('/tracks/search?query='+query)
    },
    getOne(params){

        return instance.get('/tracks/'+params)
    },
    deleteOne(params){
        return instance.delete('/tracks/'+params)
    },
    createTrack(data) {
        let formData = new FormData()
        formData.append('name', data.name)
        formData.append('artist', data.artist)
        formData.append('text', data.text)
        formData.append('picture', data.picture)
        formData.append('audio', data.audio)
        return instance.post('/tracks', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    addComment(data){
        return instance.post('/tracks/comment', data )

    }
}