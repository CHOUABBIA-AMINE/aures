import { useContext }           from "react";

import axios                    from "axios";

import API                      from "./settings";
import { AuthContext }          from "../config/context/auth.context";



export const useHTTP = () => {

    let config = {};
    
    const { token } = useContext(AuthContext);



    const configToken = () => {
        if(token) {
            config = {
                headers: { Authorization: `Bearer ${token}` }
            };
        }else{
            config = {};
        }
    }

    const connect = (data : any) => {
        return axios.post(API.baseURL + API.authentication, data)
    }

    const getUrl = (url : string) => {
        configToken();
        return axios.get(url, config);
    }

    const getBasedUrl = (url : string) => {
        configToken();
        return axios.get(API.baseURL + url, config);
    }

    const postUrl = (url : string, data : any) => {
        configToken();
        return axios.post(url, data, config);
    }

    const postBasedUrl = (url : string, data : any) => {
        configToken();
        return axios.post(API.baseURL + url, data, config);
    }

    const deleteUrl = (url : string) => {
        configToken();
        return axios.delete(url, config);
    }

    const deleteBasedUrl = (url : string) => {
        configToken();
        return axios.delete(API.baseURL + url, config);
    }

    return {connect, getUrl, getBasedUrl, postUrl, postBasedUrl, deleteUrl, deleteBasedUrl};
}
//export { authentication, getUrl, getBasedUrl, postUrl, postBasedUrl, deleteUrl, deleteBasedUrl };
