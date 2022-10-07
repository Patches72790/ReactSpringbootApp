import React, {
  useState 
} from 'react'
import {
  ISpell,
  useSpellsFilter 
} from '../../hooks/useSpellsFilter'

export interface ISelectSpellsProps {
   addSpell: (spell: ISpell) => void
}

export const SelectSpells: React.FunctionComponent<ISelectSpellsProps> = 
({
  addSpell
}) => {

  const [filterInput, setFilterInput]= useState('')
  const spells = useSpellsFilter({
    filterInput
  })
  const handleChange = 
    ((setSetting: (val: string) => void) => 
      (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => 
        setSetting(event.target.value))
            
  return (
    <div className={"input-group"}>
      <div 
        className={"input-group-prepend"}
      >
        <button 
          className={"btn btn-secondary dropdown-toggle"}
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
        >
          {"Spells List"}
        </button>
        <div className={"dropdown-menu"}>
          {(spells.length && (spells
            .map(({
              name,
              identifier
            }) => 
              <a 
                className={"dropdown-item"}
                key={`${name}-key`}
                onClick={() => addSpell({
                  name,
                  identifier
                })}
              >
                {name}
              </a>
            )
          )
          ) || <div>{"No Spells Selected"}</div>} 
        </div>
      </div>
      <input 
        type={"text"}
        value={filterInput}
        placeholder={"Search for a Spell"}
        className={'form-control'}
        onChange={handleChange(setFilterInput)}
      />
    </div>
  )
}
