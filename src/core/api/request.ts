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
        axios.post(API.baseURL + API.authentication, data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getUrl = (url : string) => {
        configToken();
        axios.get(url, config)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            });
    }

    const getBasedUrl = (url : string) => {
        configToken();
        axios.get(API.baseURL + url, config)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            });
    }

    const postUrl = (url : string, data : any) => {
        configToken();
        axios.post(url, data, config)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const postBasedUrl = (url : string, data : any) => {
        configToken();
        axios.post(API.baseURL + url, data, config)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const deleteUrl = (url : string) => {
        configToken();
        axios.delete(url, config)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            });
    }

    const deleteBasedUrl = (url : string) => {
        configToken();
        axios.delete(API.baseURL + url, config)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            });
    }

    return {connect, getUrl, getBasedUrl, postUrl, postBasedUrl, deleteUrl, deleteBasedUrl};
}
//export { authentication, getUrl, getBasedUrl, postUrl, postBasedUrl, deleteUrl, deleteBasedUrl };
