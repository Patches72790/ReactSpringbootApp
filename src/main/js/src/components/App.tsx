import React from 'react'
import _ from 'lodash'
import {
  SelectCharacter
} from './Character/SelectCharacter'
import {
  useCharacterQuery 
} from '../queries/characterQuery'

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
          }) => (
            <SelectCharacter
              name={name}
              key={`${name}${_.uniqueId()}`}
              characterClass={characterClass}
              spells={spells}
            />
          ))
        }
        </div>
      </>
    )   
        
  } else {
    return <div> loading characters</div>
  }
}
