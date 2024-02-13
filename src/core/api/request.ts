import { useContext }           from "react";
import axios                    from "axios";

import API                      from "./settings";
import { AuthContext }          from "../config/context/auth.context";

export const useHTTP = () => {

    const { token } = useContext(AuthContext);

    const connect = (data : any) => {
        return axios.post(API.baseURL + API.authentication, data)
    }

    const getUrl = (url : string) => {
        return axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    const getBasedUrl = (url : string) => {
        return axios.get(API.baseURL + url, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    const postUrl = (url : string, data : any) => {
        return axios.post(url, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    const postBasedUrl = (url : string, data : any) => {
        return axios.post(API.baseURL + url, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    const patchUrl = (url : string, data : any) => {
        return axios.patch(url, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    const patchBasedUrl = (url : string, data : any) => {
        return axios.patch(API.baseURL + url, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    const deleteUrl = (url : string) => {
        return axios.delete(url, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    const deleteBasedUrl = (url : string) => {
        return axios.delete(API.baseURL + url, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    return {connect, getUrl, getBasedUrl, postUrl, postBasedUrl, patchUrl, patchBasedUrl, deleteUrl, deleteBasedUrl};
}