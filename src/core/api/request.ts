import { useContext }           from "react";
<<<<<<< HEAD

=======
>>>>>>> 415f3b1bac55103a3ba16da585d10c3a0c15f82f
import axios                    from "axios";

import API                      from "./settings";
import { AuthContext }          from "../config/context/auth.context";

export const useHTTP = () => {
<<<<<<< HEAD
    
=======

>>>>>>> 415f3b1bac55103a3ba16da585d10c3a0c15f82f
    const { token } = useContext(AuthContext);

    const connect = (data : any) => {
        return axios.post(API.authURL + API.authentication, data)
    }

    const getAuthority = (user : string | undefined) => {
        if(user !== undefined)
            return axios.post<string[]>(API.authURL + user + API.authority);
        else
            return null;
    }

    const getUrl = (url : string) => {
        return axios.get(url, {
            headers: {  
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }

    const getBasedUrl = (url : string) => {
        return axios.get(API.baseURL + url, {
            headers: {  
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }

    const postUrl = (url : string, data : any) => {
        return axios.post(url, data, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }

    const postBasedUrl = (url : string, data : any) => {
        return axios.post(API.baseURL + url, data, {
            headers: {  
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }

    const patchUrl = (url : string, data : any) => {
        return axios.patch(url, data, {
            headers: {  
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }

    const patchBasedUrl = (url : string, data : any) => {
        return axios.patch(API.baseURL + url, data, {
            headers: {  
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }

    const deleteUrl = (url : string) => {
        return axios.delete(url, {
            headers: {  
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }

    const deleteBasedUrl = (url : string) => {
        return axios.delete(API.baseURL + url, {
            headers: {  
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }

    return {connect, getAuthority, getUrl, getBasedUrl, postUrl, postBasedUrl, patchUrl, patchBasedUrl, deleteUrl, deleteBasedUrl};
}