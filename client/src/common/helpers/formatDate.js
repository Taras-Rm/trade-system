export const formatDate = (date) => {
    let dateArr = date.split("T")[0]
    let formatedDate = dateArr.split("-").reverse().join("-")
    return formatedDate
}