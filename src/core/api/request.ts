import axios                    from "axios";
import API                      from "./settings";

const authentication = (data : any) => {
    axios.post(API.baseURL + API.authentication, data)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const getUrl = (url : string) => {
    axios.get(url)
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
    axios.get(API.baseURL + url)
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
    axios.post(url, data)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const postBasedUrl = (url : string, data : any) => {
    axios.post(API.baseURL + url, data)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const deleteUrl = (url : string) => {
    axios.delete(url)
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
    axios.delete(API.baseURL + url)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
        });
}
export { authentication, getUrl, getBasedUrl, postUrl, postBasedUrl, deleteUrl, deleteBasedUrl };
