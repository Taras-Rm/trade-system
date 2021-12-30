export const registerUser = (data) => {
  return fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json();
  });
};
