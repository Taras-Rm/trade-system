export const formatDate = (date) => {
    let dateArr = date.split("T")[0]
    let formatedDate = dateArr.split("-").reverse().join("-")
    return formatedDate
}

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  export const monthSorter = (a, b) => {
    return months.indexOf(a.Month) - months.indexOf(b.Month);
  };