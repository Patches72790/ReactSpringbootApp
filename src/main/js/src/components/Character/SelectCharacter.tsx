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

export interface ICharacterSelectProps {
  name: string,
  characterClass: string;
}

export const SelectCharacter: React.FunctionComponent<ICharacterSelectProps> = ({
  name,
  characterClass,
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
        <button 
          type="button" 
          className="btn btn-primary"
        >
          {"View"}
        </button>
      </div>
      <div 
        className={"collapse col-6"}
        id={`collapseEditCharacter-${name}`}
      >
        <EditCharacter 
          mutateCharacters={mutateCharacters}
          classQuery={classQueryResult}
          characterClass={characterClass}
        />
      </div>
    </div>
  )
}
