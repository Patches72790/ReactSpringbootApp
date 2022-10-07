import {
  useQuery 
} from "react-query"
import {
  axiosDndClient
} from "../api/dndClient"

export interface ISpellsQuery {
  count: number;
  results: {
    index: string,
    name: string,
    url: string
  }[];
}

const useSpellQuery = () => useQuery<ISpellsQuery, Error>({
  enabled: true,
  staleTime: Infinity,
  queryFn: async () => axiosDndClient.get<ISpellsQuery>('/spells')
    .then(response => response.data), 
  queryKey: ['spells-query'],
  onError: () => console.error("Error returning data from spells api")
})

export {
  useSpellQuery
}
