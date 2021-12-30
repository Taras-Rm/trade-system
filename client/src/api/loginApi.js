export const loginUser = (data) => {
  return fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json();
  });
};

export const logoutUser = () => {
  return fetch("http://localhost:8080/api/auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  }).then((response) => {
    return response.json();
  });
};
