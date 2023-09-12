import publicClient from "../client/public.client";

const userEndpoints = {
  signup: "user/signup",
  signin: "user/signin",
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
};
export default userApi;
