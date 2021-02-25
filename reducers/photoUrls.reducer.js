export default function f(items = [], action) {
    if (action.type === "save") {
        return [...items, action.obj]
    } else {
        return items
    }
}