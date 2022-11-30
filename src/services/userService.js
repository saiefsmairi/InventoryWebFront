import axios from 'axios'

const API_URL = '/users/'

// getAllUsers
const getAllUsers = async () => {
    const userlogged = JSON.parse(localStorage.getItem("user"))
    const AuthStr = 'Bearer '.concat(userlogged.token);
    const response = await axios.get('https://inventory-back.onrender.com/users/users', { headers: { Authorization: AuthStr } });
    return (response.data)
}


const userService = {
    getAllUsers
}

export default userService