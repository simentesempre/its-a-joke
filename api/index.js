import axios from 'axios'

class Api {
    constructor(apiUrl){
        this.apiUrl = apiUrl
    }
    newsletter(email, fname = null, group = null) {
        return new Promise((resolve, reject) => {
            axios
            .post(`${this.apiUrl}/newsletter`, { 
                email,
                fname,
                group
            }, {
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
        
    }
    send(text, from, name =  null) {
        return new Promise((resolve, reject) => {
            axios
            .post(`${this.apiUrl}/send`, { 
                text,
                from,
                name
            }, {
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
        
    }
}

export default Api