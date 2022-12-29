import axios from "axios"

//"https://chatapplication.onrender.com/"
//"http://localhost:4000"
const api = axios.create({
    baseURL: "https://chatapplication.onrender.com/"
})

export default api