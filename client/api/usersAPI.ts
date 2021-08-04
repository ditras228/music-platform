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
        const formData = new FormData()
        formData.append('csrfToken', data.csrfToken)
        formData.append('email', data.email)
        formData.append('password', data.password)
        return axios.post('/api/auth/callback/credentials', formData, {})
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
