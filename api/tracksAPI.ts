import {instance} from './index'
export const TracksAPI={
    getTracks(){
        return  instance.get('/tracks')
    }
}