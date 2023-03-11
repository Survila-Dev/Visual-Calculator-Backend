import { GraphQLSchema } from "graphql"
import { MutationQueryType } from "./mutation-fields"
import { RootQueryType } from "./query-schema"

export const mainSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: MutationQueryType
})