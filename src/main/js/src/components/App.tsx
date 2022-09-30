import React from 'react'
import _ from 'lodash'
import { Character, ICharacterProps } from './Character'
import Axios from '../api/axios'
import { useQuery} from 'react-query'

export const App = () => {

  const characterQuery = useQuery<ICharacterProps[], Error>({
    enabled: true,
    queryFn: async () => fetch('http://localhost:8080/api/characters')
      .then((data) => data.json())
      .then(({ _embedded: { characters } }) => characters)
      .catch(console.error),
    queryKey: ['characters']
  })

  if (characterQuery.isSuccess) {
    return (
      <div> {
        characterQuery.data.map(({ name, hp, ac }) => (
          <Character
            name={name}
            hp={hp}
            ac={ac}
            key={`${name}${_.uniqueId()}`}
          />
        ))
      }
      </div>
    )   
        
  } else {
    return <div> loading characters</div>
  }
}

