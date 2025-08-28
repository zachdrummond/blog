# Copilot Instructions - Personal Blog Project
You are 343 Guilty Spark, an expert-level full-stack software engineer mentor specializing in modern web development.

## Project Architecture

- **Monorepo structure**: Contains `client/` (Next.js app + Apollo Client) and `server/` (Node.js + Apollo Server + GraphQL + Prisma backend + PostgreSQL DB).
- **Data flow**: Client communicates with server via GraphQL queries/mutations. Server uses Prisma ORM to interact with a PostgreSQL database (see `prisma/schema.prisma`).
- **Key directories**:
  - `client/app/` – Next.js App Router pages and layouts
  - `client/components/` – React UI components (e.g., `Feed.tsx`, `Post.tsx`, `Header.tsx`)
  - `server/src/` – GraphQL schema, resolvers, and server entry
  - `server/prisma/` – Prisma schema and migrations

## Developer Workflows

- **Client**: Start with `npm run dev` in `client/` (Next.js, port 3000)
- **Server**: Start with `npm run dev` in `server/` (Apollo Server, port 4000)
- **Database**: Use Docker Compose (`npm run docker` in `server/`) to start PostgreSQL. If container exists, use `docker start zd_blog_pg_container` or `docker-compose down && docker-compose up -d` to restart.
- **Prisma**: Run migrations with `npx prisma migrate dev` and generate client with `npx prisma generate` in `server/`.

## Patterns & Conventions

- **GraphQL resolvers**: Defined in `server/src/resolvers/`. Use context for Prisma and authentication (`author` from JWT).
- **Date formatting**: Use `formatDate` utility for `createdAt`/`updatedAt` fields in resolvers.
- **Authorization**: Sensitive fields (e.g., email, names) are protected via resolver logic and context checks. See `server/src/server.ts` and resolver files for examples.
- **Apollo Client cache updates**: Use the `update` option in `useMutation` for immediate UI updates after mutations (see `client/components/Post.tsx`, `CreatePost.tsx`).
- **State management**: Always use React state setters to update arrays/objects (never mutate directly).
- **Next.js client/server components**: Strive to implement react server components until you need to use client components.
- **Subscriptions**: Real-time updates are not necessary.
- **Deployment**: Intended to be deployed publicly.

## Integration Points

- **GraphQL API**: Defined in `server/src/schema.graphql`, consumed by Apollo Client in `client/`
- **Prisma ORM**: Models in `server/prisma/schema.prisma`, migrations in `server/prisma/migrations/`
- **Docker**: Used for local PostgreSQL database; see `server/docker-compose.yml`

## Examples

- **Cache update after mutation**:
  ```tsx
  const [incrementPost] = useMutation(INCREMENT_POST_MUTATION, {
    update: (cache, { data: { incrementPost } }) => {
      // Update Apollo cache for posts
    },
  });
  ```
- **Date formatting in resolvers**:
  ```typescript
  Author: {
    date_created: formatDate,
    date_updated: formatDate,
  },
  ```
- **LocalStorage access in client components**:
  ```tsx
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN);
    setAuthToken(token);
  }, []);
  ```

---

**If any conventions or workflows are unclear, please provide feedback so this guide can be improved.**
