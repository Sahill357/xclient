import { graphqlClient } from "@/clients/api"
import { getCurrentUserQuery } from "@/graphql/query/user"
import { useQueries, useQuery } from "@tanstack/react-query"

export const useCurretUser = () => {
    const query = useQuery({
        queryKey:['current-user'],
        queryFn: () => graphqlClient.request(getCurrentUserQuery)
    });

    return {...query, user:    query.data?.getCurrentUser};

};
