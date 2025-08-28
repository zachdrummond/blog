import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/schema.graphql",
  generates: {
    "shared/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../src/server.js#GraphQLContext",
        enumsAsTypes: true,
        inputMaybeValue: "undefined | T",
        mappers: {
          Author: "@prisma/client#Author as AuthorModel",
          Post: "@prisma/client#Post as PostModel",
        },
        scalars: {
          Date: 'Date',
        },
        useIndexSignature: true,
      },
    },
  },
};

export default config;
