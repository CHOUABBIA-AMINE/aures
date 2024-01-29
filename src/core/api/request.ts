import { useContext, useState }           from "react";

import axios                    from "axios";

import API                      from "./settings";
import { AuthContext }          from "../config/context/auth.context";



export const useHTTP = () => {

    const [config, setConfig] = useState({});
    
    const { token } = useContext(AuthContext);



    // const configToken = () => {
    //     if(user && user.token !== undefined) {
    //         setConfig({
    //             headers: { Authorization: `Bearer ${token}` }
    //         });
    //     }else{
    //         setConfig({});
    //     }
    // }

    const connect = (data : any) => {
        return axios.post(API.baseURL + API.authentication, data)
    }

    const getUrl = (url : string) => {
        //configToken();
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
        //configToken();
        return axios.post(url, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    const postBasedUrl = (url : string, data : any) => {
        //configToken();
        return axios.post(API.baseURL + url, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    const deleteUrl = (url : string) => {
        //configToken();
        return axios.delete(url, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    const deleteBasedUrl = (url : string) => {
        //configToken();
        return axios.delete(API.baseURL + url, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    return {connect, getUrl, getBasedUrl, postUrl, postBasedUrl, deleteUrl, deleteBasedUrl};
}
//export { authentication, getUrl, getBasedUrl, postUrl, postBasedUrl, deleteUrl, deleteBasedUrl };
