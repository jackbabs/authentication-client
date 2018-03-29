import axios from 'axios'
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types'

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
export function signupUser({ email, password }, callback){
  return function(dispatch){
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('token', response.data.token)
        callback()
      })
      .catch(error => dispatch(authError(error.response.data.error)))
  }
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser(){
  localStorage.removeItem('token')
  return {
    type: UNAUTH_USER,
  }
}

export function fetchMessage(){
  return function(dispatch){
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
  }
}

// Easier, more readable code with redux promise
// export function fetchMessage() {
//   const request = axios.get(ROOT_URL, {
//     headers: { authorization: localStorage.getItem('token')}
//   })

//   return { 
//     type: FETCH_MESSAGE,
//     payload: request
//   }
// }