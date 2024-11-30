import API from "./API";

class UsersAPI {

  static async verifyToken() {
    return await API.request("users/verify-token", {
      useAuth: true,
      showOkToast: false
    });
  }

  static async add(username, password, profileImage) {
    const body = JSON.stringify({ username, password, profileImage })
    return await API.request("users/add", {
      method: "POST",
      body: body
    });
  }

  static async login(username, password) {
    const body = JSON.stringify({ username, password })
    return await API.request("users/login", {
      method: "POST",
      body: body
    });
  }

  static async delete(password) {
    const body = JSON.stringify({ password })
    return await API.request("users/delete", {
      method: "DELETE",
      body: body,
      useAuth: true
    });
  }

  static async changePassword(password, newPassword) {
    const body = JSON.stringify({ password, newPassword });
    return await API.request("users/change-password", {
      method: "PATCH",
      body: body,
      useAuth: true
    });
  }

  static async changePfp(file) {
    const body = JSON.stringify({ profileImage: file });
    return await API.request("users/profile-image/change", {
      method: "PATCH",
      body: body,
      useAuth: true
    });
  }

  static async deletePfp() {
    return await API.request("users/profile-image/delete", {
      method: "DELETE",
      useAuth: true
    });
  }

  static async getProfile() {
    return await API.request("users/profile", {
      useAuth: true,
      showOkToast: false
    });
  }
}

export default UsersAPI;

