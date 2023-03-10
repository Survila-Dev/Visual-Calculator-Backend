//ToDo add mutation schemes
import { GraphQLSchema } from "graphql"
import { RootQueryType } from "./query-schema"

export const mainSchema = new GraphQLSchema({
    query: RootQueryType
})