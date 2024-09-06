import axios from 'axios'

const API_BASE_URL = 'http://localhost:5173/profile'

export const getProfile = (id: string) => {
  return axios.get(`${API_BASE_URL}/${id}`)
}
