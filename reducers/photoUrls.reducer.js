export default function f(photoUrls = [], action) {
    if (action.type === "saveUrl") {
        return [...photoUrls, action.url]
    } else {
        return photoUrls
    }
}