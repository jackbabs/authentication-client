import axios from 'axios'
import { AUTH_USER } from './types'

const ROOT_URL = 'http://localhost:3090'

export function signinUser({ email, password }, callback){
  return function(dispatch){
    // Submit email/password to the server 
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER })

        callback()
      })
      .catch(() => {

      })

  }
}