import React, {
  useState 
} from 'react'
import {
  ISpell,
  useSpellsFilter 
} from '../../hooks/useSpellsFilter'

export interface ISelectSpellsProps {
   addSpell: (spell: ISpell) => void;
   selectedSpells: ISpell[];
}

export const SelectSpells: React.FunctionComponent<ISelectSpellsProps> = 
({
  addSpell,
  selectedSpells,
}) => {

  const [filterInput, setFilterInput]= useState('')
  const spells = useSpellsFilter({
    filterInput,
    selectedSpells
  })
  const handleChange = 
    ((setSetting: (val: string) => void) => 
      (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => 
        setSetting(event.target.value))

  return (
    <div className={"row input-group mb-3"}>
      <div className={"col"}>
        <input 
          type={"text"}
          value={filterInput}
          placeholder={"Search for a Spell"}
          className={'form-control'}
          onChange={handleChange(setFilterInput)}
        />
      </div>
      <div className={"col-6"}>
        <ul className={'list-group'}>
          {(spells?.length 
            && filterInput.length 
            && (spells
              .slice(0, 10) // TODO allow users to set their own limit to results
              .map(({
                name,
                identifier
              }) => 
                <li 
                  className={'list-group-item'}
                  key={`${name}-key`}
                  onClick={() => addSpell({
                    name,
                    identifier
                  })}
                >
                  {name}
                </li>
              )
            )
          ) || 
        <li 
          className={'list-group-item'}
        >
          {"No Spells Selected"}
        </li>
          }
        </ul>
      </div>
    </div>
  )
}
