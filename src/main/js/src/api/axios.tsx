import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/characters',
  timeout: 2500,
})

export default axiosInstance
