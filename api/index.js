import axios from 'axios'

class Api {
    constructor(apiUrl){
        this.apiUrl = apiUrl
    }
    newsletter(email) {
        return new Promise((resolve, reject) => {
            axios
            .post(`${this.apiUrl}newsletter`, { 
                email
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