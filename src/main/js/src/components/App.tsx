import React, {
  useEffect,
  useMemo,
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
  const [currentHp, setCurrentHp] = useState('10')
  const [currentAc, setCurrentAc] = useState('10')

  useEffect(() => console.log(characterQuery), [characterQuery])

  const handleChange = 
    ((setSetting: (val: string) => void) => 
      (event: React.ChangeEvent<HTMLInputElement>) => 
        setSetting(event.target.value))

  const canSubmitCharacter: boolean = useMemo(() =>
    currentName.length > 0 &&
      currentSpells.length > 0 &&
      currentDice.length > 0 &&
      currentHp.length > 0 &&
      currentAc.length > 0
  , [
    currentName,
    currentDice,
    currentSpells,
    currentHp,
    currentAc
  ])

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
          <input
            type={"text"}
            value={currentAc}
            placeholder={"AC"}
            onChange={handleChange(setCurrentAc)}
          />
          <input
            type={"text"}
            value={currentHp}
            placeholder={"HP"}
            onChange={handleChange(setCurrentHp)}
          />
        </form> 
        <button 
          disabled={!canSubmitCharacter}
          onClick={() => mutateCharacters.mutate({
            name: currentName,
            dice: currentDice,
            spells: currentSpells,
            ac: currentAc,
            hp: currentHp,
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
