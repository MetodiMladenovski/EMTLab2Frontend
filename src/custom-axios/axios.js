import axios from "axios";

const instance = axios.create({
    baseURL: 'https://emt-backend-181085.herokuapp.com',
    headers: {
        'Access-Control-Allow-Origin' : '*'
    }
})

export default instance;