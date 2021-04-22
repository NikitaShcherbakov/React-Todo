const colors = ["", "#F13A13", "#FF7518", "#F39F18", "#FAD201", "#57A639", "#71BC78", "#177245", "#7FC7FF", "#2271B3", "#00416A", "#9932CC", "#CD00CD", "#FE28A2", "#00A86B", "#008CF0", "#FF7F49", "#E32636"];

const url = `https://cors-anywhere.herokuapp.com/https://www.apple.com/newsroom/rss-feed.rss`;
const queryOptions = {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
    mode: "cors",
    cache: "no-cache"
}
const searchError = {
    code: 404,
    statusText: "Something went wrong"
}
const filterItems = ["All", "Checked", "Unchecked"];
const date = new Date();
const dateOfCreation = date.toJSON().slice(0,10).replace(/-/g,'/') + '/' + date.getHours() + ':' + date.getMinutes();

let throwError = (error) => {
    let responseCode = error.response.status;
    let responseStatus = error.response.statusText;
    let emptyStatus = "Status text did not come";
    let status = responseStatus || emptyStatus;
    let newError = new Object();
    newError.description = `Something went wrong`;
    newError.status = `StatusText: ${status}`;
    newError.code = `Status: ${responseCode}`;
    newError.url = `Url: ${url}`;
    throw newError;
}
export {
    colors,
    url,
    queryOptions,
    searchError,
    dateOfCreation,
    filterItems,
    throwError
};