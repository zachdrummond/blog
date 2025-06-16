import { jwtVerify } from "jose";
export const APP_SECRET = "GraphQL-is-aw3some!";

const getTokenPayload = async (token: string) => {
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(APP_SECRET)
  );
  return payload;
};
export const getAuthorID = async (req?, authToken?: string) => {
  if (req) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");

      if (!token) {
        throw new Error("No token found");
      }

      const payload = await getTokenPayload(token);
      console.log(payload);
      const { authorID } = payload;
      return authorID;
    }
  } else if (authToken) {
    const payload = await getTokenPayload(authToken);
    console.log(payload);
    const { authorID } = payload;
    return authorID;
  }
  throw new Error("Not authenticated");
};
