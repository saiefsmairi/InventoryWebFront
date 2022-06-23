import axios from 'axios'

const API_URL = '/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post("http://localhost:5000/users", userData)

  /*  if (response.data) {
     localStorage.setItem('user', JSON.stringify(response.data))
   }
  */
  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post("http://localhost:5000/users/" + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}


// getme user
const getMe = async () => {
  const userlogged = JSON.parse(localStorage.getItem("user"))
  const AuthStr = 'Bearer '.concat(userlogged.token);
  const response = await axios.get('http://localhost:5000/users/me', { headers: { Authorization: AuthStr } });
  return response.data
}


const authService = {
  register,
  logout,
  login,
  getMe
}

export default authService