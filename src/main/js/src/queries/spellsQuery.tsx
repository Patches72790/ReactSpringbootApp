import {
  useQueries,
  useQuery, 
  UseQueryOptions
} from "react-query"
import {
  axiosDndClient
} from "../api/dndClient"
import {
  ISpell 
} from "../hooks/useSpellsFilter"

export interface ISpellsQuery {
  count: number;
  results: {
    index: string,
    name: string,
    url: string
  }[];
}

export interface ISpellFactsQuery {
  index: string;
  name: string;
  level: string;
  attack_type?: string;
  school: {
    index: string;
    name: string;
    url: string;
  };
  desc: string;
}

const useSpellQuery = () => useQuery<ISpellsQuery, Error>({
  enabled: true,
  staleTime: Infinity,
  queryFn: async () => axiosDndClient.get<ISpellsQuery>('/spells')
    .then(response => response.data), 
  queryKey: ['spells-query'],
  onError: () => console.error("Error returning data from spells api")
})

const useSpellFactsQuery = (spells: ISpell[]) => useQuery<ISpellFactsQuery[], Error, ISpellFactsQuery[]>({
  enabled: true,
  queryFn: async () => {
    const spellPromises = spells.map(({
      identifier
    }) => axiosDndClient.get<ISpellFactsQuery>(`/spells/${identifier}`) 
    )

    return Promise.all(spellPromises)
      .then(resolutions => resolutions.map(({
        data
      }) => data))
  },
  queryKey: 'spells-facts-query',
  onError: () => console.error("Error getting spell data for spell indices")
})

type SpellFactsQueries = UseQueryOptions<ISpellFactsQuery>[]

const useSpellFactsQueries = (spells: ISpell[]) => useQueries<SpellFactsQueries>(
  spells.map(
    ({
      identifier
    }) => ({
      enabled: true,
      queryKey: `spell-query-${identifier}`,
      queryFn: async () => axiosDndClient.get<ISpellFactsQuery>(`/spells/${identifier}`)
        .then(({
          data
        }) => data),
      onError: () => console.error(`Error getting spell fact data for spell index ${identifier}`)
    })
  )
).map(queryResult => queryResult)

export {
  useSpellQuery,
  useSpellFactsQuery,
  useSpellFactsQueries
}
