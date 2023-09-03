import jsonwebtoken from "jsonwebtoken";

const generateToken = (id) => {
  return jsonwebtoken.sign({ data: id }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "24h",
  });
};

export default generateToken;
