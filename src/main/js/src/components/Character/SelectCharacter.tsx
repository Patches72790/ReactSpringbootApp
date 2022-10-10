import React from "react"
import {
  EditCharacter 
} from './EditCharacter'
import {
  useCharacterMutation,
} from '../../queries/characterQuery'
import {
  useClassQuery
} from '../../queries/classQuery'
import {
  Link 
} from "react-router-dom"
import { ISpell } from "../../hooks/useSpellsFilter"

export interface ICharacterSelectProps {
  name: string,
  characterClass: string;
  spells: ISpell[];
}

export const SelectCharacter: React.FunctionComponent<ICharacterSelectProps> = ({
  name,
  characterClass,
  spells,
}) => { 

  const mutateCharacters = useCharacterMutation()
  const classQueryResult = useClassQuery()

  return (
    <div 
      className={"row list-group-item select-character"}
      key={`${name}-key`}
    >
      <div className={'col'}>
        <span
          className={"lead"} 
        >
          {name}
        </span>
      </div>
      <div className="col">
        <button 
          type="button" 
          className="btn btn-primary"
          data-toggle={"collapse"}
          data-target={`#collapseEditCharacter-${name}`}
        >
          {"Edit"}
        </button>
      </div>
      <div className={"col"}>
        <Link to={`view/${name}`}>
          <button 
            type="button" 
            className="btn btn-primary"
          >
            {"View"}
          </button>
        </Link>
      </div>
      <div 
        className={"collapse row"}
        id={`collapseEditCharacter-${name}`}
      >
        <EditCharacter 
          mutateCharacters={mutateCharacters}
          classQuery={classQueryResult}
          characterClass={characterClass}
          characterName={name}
          spells={spells}
        />
      </div>
    </div>
  )
}
