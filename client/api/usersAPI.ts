import {instance} from './index'
import axios from 'axios'

export const UsersAPI={
    getUsers(){
        return instance.get('auth/users')
    },
    getOne(id){
        return instance.get(`auth/${id}`)
    },
    loginByServer(data){
        return axios.get('/api/auth/signin/Login', data)
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
