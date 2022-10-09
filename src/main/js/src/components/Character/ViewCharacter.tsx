import React, {
  useMemo 
} from 'react'
import {
  useParams 
} from 'react-router'
import {
  useCharacterQuery 
} from '../../queries/characterQuery'

export const ViewCharacter = () => {
  const params = useParams()
  const characters = useCharacterQuery()

  const characterToRender = useMemo(() => {
    const character = characters.isSuccess && characters
      .data.find(({
        name
      }) => name === params.charactername )
    
    return (
      <div>
        <p>
          {character.name}
        </p>
        <p>
          {character.characterClass}
        </p>
        <ul>
          {
            character.spells && character.spells.map(
              (spell) => (
                <li>
                  {spell.name}
                </li>
              )
            )
          }
        </ul>
      </div>
    )

  }, [])

  return (
    <div>
      {characterToRender}
    </div>
  )
}
