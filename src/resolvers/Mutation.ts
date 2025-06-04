import { hash, verify } from "@node-rs/argon2";
import { SignJWT } from "jose";
import { APP_SECRET } from "../utils.js";

export async function login(parent, { email, password }, { prisma }, info) {
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) throw new Error("User not found");

  const valid = await verify(user.password, password);
  if (!valid) throw new Error("Invalid password");

  const token = await newToken(user);

  return {
    token,
    user,
  };
}

const newToken = async (user) => {
  return new SignJWT({ userID: user.id, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(APP_SECRET));
};

export async function signup(parent, args, { prisma }, info) {
  const password = await hash(args.password);
  const user = await prisma.user.create({ data: { ...args, password } });
  const token = await newToken(user);

  return {
    token,
    user,
  };
}
