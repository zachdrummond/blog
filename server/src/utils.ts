import { jwtVerify } from "jose";
export const APP_SECRET = "GraphQL-is-aw3some!";

/**
 * Formats a date to MM/DD/YYYY format
 */
export const formatDate = (parent) => {
  const date_string = parent?.date_created || parent?.date_updated;
  if (!date_string) return null;

  const date = new Date(date_string);
  return `${date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })} ${date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })}`;
};

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
  ).catch((error) => {
    console.error("Error verifying token:", error);
    throw new Error("Invalid token");
  });
  return payload;
};

export const omitFields = (author) => {
  return author?.role === "ADMIN"
    ? { password: true }
    : {
        email: true,
        password: true,
        first_name: true,
        last_name: true,
        role: true,
      };
};
