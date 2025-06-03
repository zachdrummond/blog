import * as jose from "jose";
const APP_SECRET = "GraphQL-is-aw3some!";

const getTokenPayload = (token: string) => {};
const getUserID = (req?: Request, authToken?: string) => {
  if (req) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.replace("Bearer", "");

      if (!token) {
        throw new Error("No token found");
      }

      const { userID } = getTokenPayload(token);
      return userID;
    }
  } else if (authToken) {
    const { userID } = getTokenPayload(token);
    return userID;
  }
  throw new Error('Not authenticated');
};

module.exports = {
    APP_SECRET,
    getUserID
}
