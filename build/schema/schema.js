"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainSchema = void 0;
const graphql_1 = require("graphql");
const mutation_fields_1 = require("./mutation-fields");
const query_schema_1 = require("./query-schema");
exports.mainSchema = new graphql_1.GraphQLSchema({
    query: query_schema_1.RootQueryType,
    mutation: mutation_fields_1.MutationQueryType
});
