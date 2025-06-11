export function posts({ id }, args, { prisma }, info) {
  return prisma.author
    .findUnique({
      where: { id: id },
    })
    .posts();
}
