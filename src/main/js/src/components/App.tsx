import React, {
  useState 
} from 'react'
import _ from 'lodash'
import {
  Character
} from './Character'
import {
  useCharacterMutation,
  useCharacterQuery 
} from '../queries/characterQuery'

export const App = () => {

  const characterQuery = useCharacterQuery()
  const mutateCharacters = useCharacterMutation()
  const [currentName, setCurrentName] = useState('')

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
    setCurrentName(event.target.value)
  }

  if (characterQuery.isSuccess) {
    return (
      <div className="character-list"> {
        characterQuery.data.map(({
          name, hp, ac 
        }) => (
          <Character
            name={name}
            hp={hp}
            ac={ac}
            key={`${name}${_.uniqueId()}`}
          />
        ))
      }
      <div className="add-character">
        <form>
          <input type={"text"} value={'Name'} onChange={handleNameChange}></input> 
        </form> 
        <button onClick={() => mutateCharacters.mutate({
          name: currentName,
          damage_dice: [],
          spells: [],
        })}>
          {"Add a Character"}
        </button>
      </div>
      </div>
    )   
        
  } else {
    return <div> loading characters</div>
  }
}
