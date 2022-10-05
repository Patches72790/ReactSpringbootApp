import axios from 'axios'

const PORT = process.env.PORT
const DOMAIN = process.env.NODE_ENV === 'development' ? 'http://localhost' : process.env.DOMAIN

const axiosInstance = axios.create({
  baseURL: `${DOMAIN}:${PORT}`,
  timeout: 2500,
})

export default axiosInstance
