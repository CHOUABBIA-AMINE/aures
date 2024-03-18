import { useContext }           from "react";
import axios                    from "axios";

import API                      from "./settings";
import { AuthContext }          from "../config/context/auth.context";

export const useHTTP = () => {

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

    const uploadFile = (file : any) => {
        const formData = new FormData();
        formData.append('file',file)
        return axios.post(API.uploadURL, formData, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'content-type': 'multipart/form-data'
            }
        });
    }

    const getFile = (fileId : number) => {
        return API.uploadURL + "/" + fileId;
        /*axios.get(API.uploadURL + "/" + fileId, {
            headers: {  
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8'
            }
        });*/
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

    const postUrl = (url : string, data : any, contentType : string = "") => {
        let headers = {};
        if(contentType === ""){
            headers = {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        }else{
            headers = {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': contentType
                }
            }
        }
        return axios.post(url, data, headers);
    }

    const postBasedUrl = (url : string, data : any) => {
        return axios.post(API.baseURL + url, data, {
            headers: {  
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }

    const putUrl = (url : string, data : any, contentType : string = "") => {
        let headers = {};
        if(contentType === ""){
            headers = {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        }else{
            headers = {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': contentType
                }
            }
        }
        return axios.put(url, data, headers);
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

    return {connect, getAuthority, uploadFile, getFile, getUrl, getBasedUrl, postUrl, postBasedUrl, putUrl, patchUrl, patchBasedUrl, deleteUrl, deleteBasedUrl};
}