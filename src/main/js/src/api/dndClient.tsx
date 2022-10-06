import axios from 'axios'

export const axiosDndClient = axios.create({
  baseURL: 'https://www.dnd5eapi.co/api',
  timeout: 2500
})
