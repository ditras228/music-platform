import {instance} from './index'

export const UsersAPI={
    getUsers(){
        return instance.get('auth/users')
    },
    getOne(id){
        return instance.get(`auth/users/${id}`)
    },
    auth(token){
        return instance.get('auth/',
            {headers: {Authorization: `Bearer ${token}`}})
    },
    login(props){
        return instance.post('auth/login', props)
    },
    registration(props){
        return instance.post('auth/registration', props)
    }
}
