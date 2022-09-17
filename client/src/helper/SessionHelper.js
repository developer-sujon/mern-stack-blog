class SessionHelper {
  static SetToken(accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }
  static GetToken() {
    return localStorage.getItem("accessToken");
  }
  static RemoveToken() {
    return localStorage.removeItem("accessToken");
  }
  static SetUserDetails(User) {
    localStorage.setItem("User", JSON.stringify(User));
  }
  static GetUserDetails() {
    return JSON.parse(localStorage.getItem("User"));
  }
  static RemoveUserDetails() {
    return localStorage.removeItem("User");
  }
  static SetOtpEmail(Email) {
    return localStorage.setItem("OTPEmail", Email);
  }
  static GetOtpEmail() {
    return localStorage.getItem("OTPEmail");
  }
  static SetOtpCode(Otp) {
    return localStorage.setItem("OTPCode", Otp);
  }
  static GetOtpCode() {
    return localStorage.getItem("OTPCode");
  }

  static SetVerifyEmail(Email) {
    return localStorage.setItem("VerifyEmail", Email);
  }
  static GetVerifyEmail() {
    return localStorage.getItem("VerifyEmail");
  }

  static ResetStorage() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("User");
    localStorage.removeItem("OTPEmail");
    localStorage.removeItem("OTPCode");
    return true;
  }
}

export default SessionHelper;
