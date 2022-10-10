import React from 'react'
import _ from 'lodash'
import {
  SelectCharacter
} from './Character/SelectCharacter'
import {
  useCharacterQuery 
} from '../queries/characterQuery'
import {
  NewCharacter 
} from './Character/NewCharacter'

export const App = () => {

  const characterQuery = useCharacterQuery()

  if (characterQuery.isSuccess) {
    return (
      <>
        <h1 className="display-4 title-text"> 
          {"Character Viewer and Spell Tracker"} 
        </h1>
        <div className="character-list list-group container"> {
          characterQuery.data.map(({
            name,
            characterClass,
            spells,
            id,
          }) => (
            <SelectCharacter
              name={name}
              key={`${name}${_.uniqueId()}`}
              characterClass={characterClass}
              spells={spells}
              id={id}
            />
          ))
        }
        </div>
        <NewCharacter />
      </>
    )   
        
  } else {
    return <div> loading characters</div>
  }
}
