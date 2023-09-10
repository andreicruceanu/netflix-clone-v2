import publicClient from "../client/public.client";

const userEndpoints = {
  signup: "user/signup",
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
};
export default userApi;
