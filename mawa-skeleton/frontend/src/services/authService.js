import api from './api.js'

export async function loginRequest(credentials, role) {
  const { data } = await api.post('/auth/login', { ...credentials, role })
  localStorage.setItem('mawa_token', data.token)
  localStorage.setItem('mawa_user', JSON.stringify(data.user))
  return data.user
}

export async function signupRequest(payload) {
  const { data } = await api.post('/auth/signup', payload)
  localStorage.setItem('mawa_token', data.token)
  localStorage.setItem('mawa_user', JSON.stringify(data.user))
  return data.user
}

export function logoutRequest() {
  localStorage.removeItem('mawa_token')
  localStorage.removeItem('mawa_user')
}

export function getCurrentUser() {
  const stored = localStorage.getItem('mawa_user')
  return stored ? JSON.parse(stored) : null
}