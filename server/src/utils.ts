import { jwtVerify, SignJWT, JWTPayload } from "jose";
import { Author } from "../shared/types.js";
import { IncomingMessage } from "http";
export const APP_SECRET = "GraphQL-is-aw3some!";

export const createNewToken = async (author: Author) => {
  return new SignJWT(author)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(APP_SECRET));
};

/**
 * Formats a date to MM/DD/YYYY format
 */
// export const formatDate = (parent) => {
//   const date_string = parent?.date_created || parent?.date_updated;
//   if (!date_string) return null;

//   const date = new Date(date_string);
//   return `${date.toLocaleDateString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   })} ${date.toLocaleTimeString("en-US", {
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   })}`;
// };

export const getAuthor = async (
  req: IncomingMessage
): Promise<Author | null> => {
  if (req) {
    const token = req.headers.authorization;

    if (token) {
      const payload: JWTPayload = await getTokenPayload(token);
      const author: Author = payload.author as Author;
      console.log(payload);
      return author;
    }
  }
  return null;
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

export const omitFields = (author: Author) => {
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
