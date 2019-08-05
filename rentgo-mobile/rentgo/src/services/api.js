import axios from 'axios'
import { AsyncStorage } from 'react-native'

const api = axios.create({
    baseURL: 'http://localhost:3333'
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