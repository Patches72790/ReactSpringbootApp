import {
  useSpellQuery 
} from "../queries/spellsQuery"

export type IUseSpellsFilter = ( params: {
  filterInput: string
}) => ISpell[]

export type ISpell = {
  name: string;
  identifier: string;
}

export const useSpellsFilter: IUseSpellsFilter = ({
  filterInput
}) => {

  const spellQuery = useSpellQuery()

  if (!spellQuery.isSuccess) {
    return []
  } else{
    return spellQuery.data.results.filter(({
      name
    }) => name.toLowerCase().startsWith(filterInput.toLowerCase().trim()))
      .map(({
        name,
        index
      }) => ({
        name,
        identifier: index
      }))
  }
}
