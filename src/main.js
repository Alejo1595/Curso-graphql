import { join } from 'path';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { createServer } from '@graphql-yoga/node';

async function main() {
  // Load schema from the file
  const schema = await loadSchema(join(__dirname, './schema.graphql'), {
    loaders: [new GraphQLFileLoader()],
  });

  // Write some resolvers
  const resolvers = {
    Query: {
      hello: () => 'Hello word',
    },
  };

  // Add resolvers to the schema
  const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers,
  });

  const server = createServer({
    schema: schemaWithResolvers,
  });

  await server.start();
}

main().catch((error) => console.error(error));
