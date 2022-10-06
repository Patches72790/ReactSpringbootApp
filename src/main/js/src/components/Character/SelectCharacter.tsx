import React from "react"
import {
  EditCharacter 
} from './EditCharacter'
import {
  SpellDropdown 
} from '../SpellDropdown'
import {
  useCharacterMutation,
} from '../../queries/characterQuery'
import {
  useSpellQuery 
} from '../../queries/spellsQuery'

export interface ICharacterSelectProps {
  name: string,
}

export const SelectCharacter: React.FunctionComponent<ICharacterSelectProps> = ({
  name,
}) => { 

  const mutateCharacters = useCharacterMutation()
  const spellQueryResult = useSpellQuery()

  return (
    <div 
      className={"list-group-item"}
      key={`${name}-key`}
    >
      <span
        className={"lead"} 
      >
        {name}
      </span>
      <button 
        type="button" 
        className="btn btn-primary"
        data-toggle={"collapse"}
        data-target={`#collapseEditCharacter-${name}`}
      >
        {"Edit"}
      </button>
      <button 
        type="button" 
        className="btn btn-primary"
      >
        {"View"}
      </button>
      <div 
        className={"collapse"}
        id={`collapseEditCharacter-${name}`}
      >
        <EditCharacter 
          mutateCharacters={mutateCharacters}
        />
        <SpellDropdown
          spellQueryResult={spellQueryResult}
        />
      </div>
    </div>
  )
}
