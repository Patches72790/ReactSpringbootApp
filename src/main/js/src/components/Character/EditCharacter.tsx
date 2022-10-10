import React, {
  useState,
  useMemo,
} from 'react'
import {
  UseMutationResult, UseQueryResult 
} from 'react-query'
import {
  ISpell 
} from '../../hooks/useSpellsFilter'
import {
  INewCharacter
} from '../../queries/characterQuery'
import {
  IClassQuery 
} from '../../queries/classQuery'
import {
  SelectSpells
} from './SelectSpells'

export interface IEditCharacterProps {
  mutateCharacters: UseMutationResult<void, Error, INewCharacter, unknown>;
  classQuery: UseQueryResult<IClassQuery, Error>;
  characterClass: string;
  characterName: string;
  spells: ISpell[];
}

export const EditCharacter: React.FunctionComponent<IEditCharacterProps> = ({
  mutateCharacters,
  classQuery,
  characterClass,
  characterName,
  spells,
}) => {
  const [currentName, setCurrentName] = useState(characterName || '')
  const [currentSpells, setCurrentSpells] = useState<ISpell[]>(spells || [])
  const [currentClass, setCurrentClass] = useState(characterClass || 'Barbarian')

  const handleChange = 
    ((setSetting: (val: string) => void) => 
      (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => 
        setSetting(event.target.value))

  const canSubmitCharacter: boolean = useMemo(() =>
    currentName.length > 0 &&
    currentSpells.length > 0 &&
    currentClass.length > 0
  ,[
    currentName,
    currentSpells,
    currentClass
  ])

  const addSpell = (spellName: ISpell) => 
    !currentSpells.includes(spellName) &&
    setCurrentSpells(
      [
        ...currentSpells,
        spellName
      ]
    )

  const removeSpell = (index: number) => 
    setCurrentSpells([
      ...currentSpells.slice(0, index),
      ...currentSpells.slice(index + 1)
    ])

  return (
    <div className="add-character">
      <form>
        <div className={"row input-group mb-3"}>
          <input 
            type={"text"} 
            value={currentName} 
            placeholder={"Name"}
            className={'form-control'}
            onChange={handleChange(setCurrentName)}
          />
        </div>
        <div className={"row input-group mb-3"}>
          <select
            placeholder={"Select Class"}
            className={'form-control custom-select'}
            onChange={handleChange(setCurrentClass)}
            value={currentClass}
          >
            {
              classQuery.isSuccess && classQuery.data.results.map(({
                name
              }) => (
                <option 
                  value={name}
                  key={`${name}-key`}
                >
                  {name} 
                </option>
              ))
            }
          </select>
        </div>
        <SelectSpells
          addSpell={addSpell}
          selectedSpells={currentSpells}
        />
      </form> 
      <div className={"row mb-3 selected-spells"}>
        <ul 
          className={'list-group'}
        >
          {
            currentSpells.map(({
              name
            }, index) => (
              <li
                key={`list-${name}-key`}
                className={'list-group-item'}
                onClick={() => removeSpell(index)}
              >
                {name}
              </li>
            ))
          }
        </ul>
      </div>
      <button 
        type={'button'}
        className={"btn btn-success"}
        disabled={!canSubmitCharacter}
        onClick={() => mutateCharacters.mutate({
          name: currentName,
          spells: currentSpells.map(({
            identifier
          }) => identifier),
          characterClass: currentClass
        })}>
        {"Save Changes"}
      </button>
    </div>
  )}
