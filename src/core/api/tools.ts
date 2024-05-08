import API                      from "./settings";


const formatURL = (url : string) => {
    return url.indexOf("{") === -1 ? url : url.slice(0, url.indexOf("{"));
}

const getIdFromUrl = (url : string) => {
    return formatURL(url).lastIndexOf("/") === -1 ? "" : url.slice(url.lastIndexOf("/")+1);
}

const getUrlFromId = (id : number) => {
    return API.uploadURL + "/" + id;
}


export { formatURL, getIdFromUrl, getUrlFromId};
