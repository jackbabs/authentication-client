import axios from 'axios'
import { AUTH_USER, AUTH_ERROR } from './types'

const ROOT_URL = 'http://localhost:3090'

export function signinUser({ email, password }, callback){
  return function(dispatch){
    // Submit email/password to the server 
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER })

        localStorage.setItem('token', response.data.token)

        callback()
      })
      .catch(() => {
        dispatch(authError('Bad login info'))

      })

  }
}


export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  }
}