import axios from 'axios' 

const httpClient = axios.create({
    baseURL: 'http://0.0.0.0:8084/'
})

export default class ApiService {
    constructor(apiurl) {
        this.apiurl = apiurl
    }

    post(url, objeto) {
        return httpClient.post(url, objeto)
    }

    put(url, objeto) {
        return httpClient.put(url, objeto)
    }

    get(url) {
        return httpClient.get(url)
    }

    delete(url) {
        return httpClient.delete(url)
    }
}