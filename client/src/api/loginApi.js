import { httpService } from "../common/services/httpService";


export const loginApi = (data) => httpService.post('/auth/login', data);



// export const logoutUser = () => {
//   return fetch("http://localhost:8080/api/auth/logout", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     credentials: "include",
//   }).then((response) => {
//     return response.json();
//   });
// };
