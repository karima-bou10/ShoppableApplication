import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  isAuthenticated() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.accessToken; // Check if user is logged in and has an access token
  }
  login(user) {
    return axios
      .post(API_URL + "signin", {
        username: user.username,
        password: user.password,
        role: user.role,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "signup", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
