class SessionHelper {
  static setToken(accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }
  static getToken() {
    return localStorage.getItem("accessToken") || null;
  }
  static removeToken() {
    return localStorage.removeItem("accessToken");
  }
  static setUserDetails(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  static getUserDetails() {
    return JSON.parse(localStorage.getItem("user")) || null;
  }
  static removeUserDetails() {
    return localStorage.removeItem("user");
  }
}

export default SessionHelper;
