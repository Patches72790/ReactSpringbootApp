import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'localhost:8080/characters',
    timeout: 2500,
})

export default axiosInstance
