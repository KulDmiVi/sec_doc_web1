import api from "./api";
import TokenService from "./token.service";
import VueJwtDecode from 'vue-jwt-decode'


class AuthService {
  login({ username, password }) {
    return api
      .post("/auth/login/", {
        username,
        password
      })
      .then((response) => {
        if (response.data.access) {

          TokenService.setUser(response.data);

        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  // register({ username, email, password }) {
  //   return api.post("/auth/signup", {
  //     username,
  //     email,
  //     password
  //   });
  // }
}

export default new AuthService();
