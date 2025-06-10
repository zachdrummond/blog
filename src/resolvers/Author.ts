export function posts(parent, args, { prisma }, info) {
  return prisma.author
    .findUnique({
      where: { id: parent.id },
    })
    .posts();
}
