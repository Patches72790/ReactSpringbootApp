import {
  useMutation,
  useQuery 
} from 'react-query'
import {
  ICharacterProps 
} from '../components/Character'

const useCharacterQuery = () => useQuery<ICharacterProps[], Error>({
  enabled: true,
  queryFn: async () => fetch('http://localhost:8080/api/characters')
    .then((data) => data.json())
    .then(({
      _embedded: {
        characters 
      } 
    }) => characters)
    .catch(console.error),
  queryKey: ['characters']
})

export interface INewCharacter {
    name?: string;
    damage_dice?: string[];
    spells?: string[];
}

const useCharacterMutation = () => useMutation<void, Error, INewCharacter>(
  async ({
    name, damage_dice, spells 
  }) => 
    fetch('http://localhost:8080/api/characters', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, 
        damage_dice,
        spells
      }) 
    })
      .then((result) => result.json())
      .catch(() => console.error('Error uploading character')),
  {
    mutationKey: 'upload-character',
  })

export {
  useCharacterQuery,
  useCharacterMutation
}
