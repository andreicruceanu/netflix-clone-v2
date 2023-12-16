import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
  signup: "user/signup",
  signin: "user/signin",
  getInfo: "user/info",
  updateProfile: "user/update",
  changePassword: "user/update-password",
  changeEmail: "user/changeEmail",
};

const userApi = {
  signup: async ({ firstName, lastName, email, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.signup, {
        firstName,
        lastName,
        email,
        password,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  signin: async ({ email, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.signin, {
        email,
        password,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  updateProfileUser: async ({ firstName, lastName, profilePicture }) => {
    try {
      const response = await privateClient.post(userEndpoints.updateProfile, {
        firstName,
        lastName,
        profilePicture,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  changePassword: async ({ oldPassword, password, confirmPassword }) => {
    try {
      const response = await privateClient.put(userEndpoints.changePassword, {
        oldPassword,
        password,
        confirmPassword,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  changeEmail: async ({ oldEmail, newEmail, password }) => {
    try {
      const response = await privateClient.put(userEndpoints.changeEmail, {
        oldEmail,
        newEmail,
        password,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
};
export default userApi;
