
import { createContext, useReducer, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('doctor-user'))

    if (user) {
      try {
        const decodedToken = jwtDecode(user)  // Decode the token to get the payload
        const currentTime = Math.floor(Date.now() / 1000) // Current time in seconds

        if (decodedToken.exp < currentTime) {
          // Token is expired, log the user out
          console.log("Logging Out User")
          localStorage.removeItem('doctor-user')
          dispatch({ type: 'LOGOUT' })
        } else {
          console.log("Welcome User")
          // Token is valid, log the user in
          dispatch({ type: 'LOGIN', payload: user })
        }
        } catch (error) {
        console.error('Error decoding token:', error)
        // If there's any issue with decoding, log the user out
        localStorage.removeItem('doctor-user')
        dispatch({ type: 'LOGOUT' })
      }
    }
  }, [])

  // console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}
