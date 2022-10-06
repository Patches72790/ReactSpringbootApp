import React, {
  useState,
  useMemo
} from 'react'
import {
  UseMutationResult 
} from 'react-query'
import {
  INewCharacter 
} from '../../queries/characterQuery'

export interface IEditCharacterProps {
  mutateCharacters: UseMutationResult<void, Error, INewCharacter, unknown>;
}

export const EditCharacter: React.FunctionComponent<IEditCharacterProps> = ({
  mutateCharacters
}) => {
  const [currentName, setCurrentName] = useState('')
  const [currentDice, setCurrentDice] = useState('')
  const [currentSpells, setCurrentSpells] = useState('')
  const [currentHp, setCurrentHp] = useState('10')
  const [currentAc, setCurrentAc] = useState('10')

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

  return (
    <div className="add-character">
      <form>
        <div className={"row"} >
          <div className={"col"}>
            <input 
              type={"text"} 
              value={currentName} 
              onChange={handleChange(setCurrentName)}
            />
          </div>
          <div className={"col"}>
            <input
              type={"text"}
              value={currentSpells}
              placeholder={"Spells"}
              onChange={handleChange(setCurrentSpells)}
            />
          </div>
        </div>
        <div className={"row"} >
          <div className={"col"} >
            <input
              type={"text"}
              value={currentAc}
              placeholder={"AC"}
              onChange={handleChange(setCurrentAc)}
            />
          </div>
          <div className={"col"}>
            <input
              type={"text"}
              value={currentHp}
              placeholder={"HP"}
              onChange={handleChange(setCurrentHp)}
            />
          </div>
        </div>
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
  )}
