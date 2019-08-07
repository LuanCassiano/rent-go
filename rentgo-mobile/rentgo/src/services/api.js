import axios from 'axios'
import { AsyncStorage } from 'react-native'

const api = axios.create({
    baseURL: 'https://api-tcc-rentgo.herokuapp.com'
})

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('RentGoToken')
    const headers = { ...config.headers }

    if(token) {
        headers.Authorization = `Bearer ${token}`
    }

    return { ...config, headers }
})

export default api