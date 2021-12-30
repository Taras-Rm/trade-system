export const getUser = () => {
  return fetch("http://localhost:8080/api/auth/user", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  }).then((response) => {
    return response.json();
  });
};

export const getGoods = (userId) => {
  return fetch(`http://localhost:8080/api/good`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  }).then((response) => {
    return response.json();
  });
};
