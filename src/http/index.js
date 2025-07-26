import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000"; 

// unauthenticated user register/login
const API = axios.create({
    baseURL : API_BASE_URL + "/api",
    headers:{
        "Content-Type":"application/json",            // if form,image use multipart/formData
        "Accept":"application/json"
    }
})

// authenticated user (giving permision)
const APIAuthenticated = axios.create({
    baseURL : API_BASE_URL + "/api",
    headers:{
        "Content-Type":"application/json",            // if form,image use multipart/formData
        "Accept":"application/json",
        "token":`${localStorage.getItem("token")}`

        
    }
    
})


export {API,APIAuthenticated}