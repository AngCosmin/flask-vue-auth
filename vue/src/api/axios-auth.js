import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Authorization': {
            toString() {
                return `Bearer ${localStorage.getItem('token')}`
            }
        }
    }
});

export default instance