import axios from 'axios'

const API_URL = '/company/'



// getcompanybyadmin
const getcompanybyadmin = async (user) => {
    const userlogged = JSON.parse(localStorage.getItem("user"))
    const AuthStr = 'Bearer '.concat(userlogged.token);
    const response = await axios.get("http://localhost:5000/company/getCompanyByAdmin/" + user._id, { headers: { Authorization: AuthStr } })
    return (response.data)
}


const companyService = {
    getcompanybyadmin
}

export default companyService