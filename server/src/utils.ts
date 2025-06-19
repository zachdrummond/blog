import { jwtVerify } from "jose";
export const APP_SECRET = "GraphQL-is-aw3some!";

export const getAuthor = async (req?, authToken?: string) => {
  let payload;
  if (req) {
    const token = req.headers.authorization;

    if (token) {
      payload = await getTokenPayload(token);
    }
  } else if (authToken) {
    payload = await getTokenPayload(authToken);
  } else {
    return null;
  }
  return { id: payload.author_id, role: payload.author_role };
};

const getTokenPayload = async (token: string) => {
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(APP_SECRET)
  );
  return payload;
};
