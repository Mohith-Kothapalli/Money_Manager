import axios from "axios";
import{BASE_URL} from "./apiEndpoints";

const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

const excludeEndpoints = ["/login", "/register","/status","/activate","health"];

//request interceptor 
axiosConfig.interceptors.request.use((config) => {
    const shouldSkipToken = excludeEndpoints.some(endpoint =>{return config.url?.includes(endpoint)});

    if(!shouldSkipToken){
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
},(error)=>{
    return Promise.reject(error);
});

//response interceptor
axiosConfig.interceptors.response.use((response)=>{
    return response;
},(error)=>{
    if(error.response && error.response.status === 401){
        window.location.href = "/login";
    }else if(error.response && error.response.status === 500){
        console.log("server error.Plz try again later");
    }else if(error.code=== "ECONNABORTED"){
        console.log("Request timeout. Please try again later.");
    }
    return Promise.reject(error);
});

export default axiosConfig;