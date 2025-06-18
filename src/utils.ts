import { jwtVerify } from "jose";
export const APP_SECRET = "GraphQL-is-aw3some!";

export const getAuthor = async (req?, authToken?: string) => {
  if (req) {
    const token = req.headers.authorization;

    if (token) {
      const payload = await getTokenPayload(token);
      return  { id: payload.author_id, role: payload.author_role };
    }
  } else if (authToken) {
    const payload = await getTokenPayload(authToken);
    return { id: payload.author_id, role: payload.author_role };
  }
  throw new Error("Not authenticated");
};

const getTokenPayload = async (token: string) => {
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(APP_SECRET)
  );
  return payload;
};

export const hasRole = (requiredRole, userRole) => {
  if (!userRole) return false;
  if (requiredRole === "ADMIN" && userRole === "ADMIN") return true;
  if (
    requiredRole === "AUTHOR" &&
    (userRole === "ADMIN" || userRole === "AUTHOR")
  )
    return true;
  return false;
};
