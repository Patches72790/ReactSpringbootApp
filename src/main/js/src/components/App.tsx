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
  const [currentDice, setCurrentDice] = useState('')
  const [currentSpells, setCurrentSpells] = useState('')

  const handleChange = (setSetting: (val: string) => void) => 
    (event: React.ChangeEvent<HTMLInputElement>) => 
      setSetting(event.target.value)

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
          <input 
            type={"text"} 
            value={currentName} 
            onChange={handleChange(setCurrentName)}
          />
          <input
            type={"text"}
            value={currentDice}
            placeholder={"Dice"}
            onChange={handleChange(setCurrentDice)}
          />
          <input
            type={"text"}
            value={currentSpells}
            placeholder={"Spells"}
            onChange={handleChange(setCurrentSpells)}
          />
        </form> 
        <button onClick={() => mutateCharacters.mutate({
          name: currentName,
          damage_dice: currentDice,
          spells: currentSpells,
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
