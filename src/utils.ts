import { jwtVerify } from "jose";
export const APP_SECRET = "GraphQL-is-aw3some!";

const getTokenPayload = async (token: string) => {
    const { payload } =  await jwtVerify(token, new TextEncoder().encode(APP_SECRET));
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

      const { authorID } = await getTokenPayload(token);
      return authorID;
    }
  } else if (authToken) {
    const { authorID } = await getTokenPayload(authToken);
    return authorID;
  }
  throw new Error('Not authenticated');
};
