const formatURL = (url : string) => {
    console.log(url.length + " : " + url.indexOf("{"))
    return url.indexOf("{") === -1 ? url : url.slice(0, url.indexOf("{"));
}


export { formatURL };
