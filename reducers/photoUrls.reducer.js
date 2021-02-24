export default function f(urls = [], action) {
    if (action.type === "saveUrl") {
        return [...urls, action.url]
    } else {
        return urls
    }
}