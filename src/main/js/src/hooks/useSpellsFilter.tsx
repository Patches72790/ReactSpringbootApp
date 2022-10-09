import {
  useSpellQuery 
} from "../queries/spellsQuery"

export type IUseSpellsFilter = ( params: {
  filterInput: string,
  selectedSpells: ISpell[]
}) => ISpell[]

export type ISpell = {
  name: string;
  identifier: string;
}

export const useSpellsFilter: IUseSpellsFilter = ({
  filterInput,
  selectedSpells,
}) => {

  const spellQuery = useSpellQuery()

  if (spellQuery.isSuccess && spellQuery.data.results) {
    return spellQuery.data.results.filter(({
      name
    }) => name
      .toLowerCase()
      .startsWith(
        filterInput.toLowerCase()) &&
        !selectedSpells.some(({
          name: selectedName 
        }) => name === selectedName)      
    )
      .map(({
        name,
        index
      }) => ({
        name,
        identifier: index
      })) 
  } else {
    return []
  }
}
