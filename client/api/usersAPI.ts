import {instance} from './index'

export const UsersAPI={
    getUsers(){
        return instance.get('auth/users')
    },
    auth(){
        return instance.post('auth/')
    },
    login(props){
        return instance.post('auth/login', props)
    },
    registration(props){
        return instance.post('auth/registration', props)
    }
}