const formatURL = (url : string) => {
    return url.indexOf("{") === -1 ? url : url.slice(0, url.indexOf("{"));
}


export { formatURL };
