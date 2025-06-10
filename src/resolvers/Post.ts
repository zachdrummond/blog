export function author(parent, args, { prisma }, info) {
  return prisma.post
    .findUnique({
      where: { id: parent.id },
    })
    .author();
}
