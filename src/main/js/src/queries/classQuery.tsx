import {
  useQuery 
} from "react-query"
import {
  axiosDndClient
} from "../api/dndClient"

export interface IClassQuery {
  count: number;
  results: {
    index: string,
    name: string,
    url: string
  }[];
}

const useClassQuery = () => useQuery<IClassQuery, Error>({
  enabled: true,
  staleTime:Infinity,
  queryFn: async () => axiosDndClient.get<IClassQuery>('/classes')
    .then(response => response.data), 
  queryKey: ['classes-query'],
  onError: () => console.error("Error returning data from classes api")
})

export {
  useClassQuery
}
