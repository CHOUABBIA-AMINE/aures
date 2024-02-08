const formatURL = (url : string) => {
    return url.slice(0, url.indexOf("{"));
}


export { formatURL };
