async function login(parent, { email, password }, { prisma }, info) {
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign({ userID: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function signup(parent, args, { prisma }, info) {
  const password = await bcrypt.hashpassword(args.password, 10);
  const user = await prisma.user.create({ data: { ...args, password } });
  const token = jwt.sign({ userID: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

module.exports = {
  login,
  signup,
};
