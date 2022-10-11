import React, {
  useMemo 
} from 'react'
import {
  useParams 
} from 'react-router'
import {
  useCharacterQuery 
} from '../../queries/characterQuery'
import {
  SpellCards 
} from '../Spells/SpellCards'

export const ViewCharacter = () => {
  const params = useParams()
  const characters = useCharacterQuery()

  const characterToRender = useMemo(() => {
    const character = characters.isSuccess && characters
      .data.find(({
        name
      }) => name === params.charactername )
    
    return (
      <>
        <div className={"row mb-3"}>
          <div className="col">
            <h3>
              {character.name}
            </h3>
            <h5>
              {character.characterClass}
            </h5>
          </div>
          <img 
            className="col rounded float-end"
            style={{
              maxWidth: '15%',
              height: 'auto'
            }}
            src={`/${character.characterClass}.png`} 
          />
        </div>
        <SpellCards 
          spells={character.spells}
        />
      </>
    )

  }, [])

  return (
    <div>
      {characterToRender}
    </div>
  )
}
