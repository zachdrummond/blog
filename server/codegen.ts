import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/schema.graphql",
  generates: {
    "shared/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../src/server.js#GraphQLContext",
        useIndexSignature: true,
        mappers: {
          Author: "@prisma/client#Author as AuthorModel",
          Post: "@prisma/client#Post as PostModel",
        },
        inputMaybeValue: "undefined | T"
      },
    },
  },
};

export default config;
