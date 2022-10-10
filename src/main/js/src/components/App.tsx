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
        <div className={'row'}>
          <button className={'btn btn-primary'}>
            {'New Character'}
          </button>
        </div>
      </>
    )   
        
  } else {
    return <div> loading characters</div>
  }
}
