// types/graphql-request.d.ts
declare module 'graphql-request' {
    export class GraphQLClient {
      constructor(endpoint: string, options?: {
        headers?: Record<string, string>;
      });
      request<T>(query: string, variables?: Record<string, any>): Promise<T>;
    }
  }
  