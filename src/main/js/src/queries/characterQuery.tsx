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
    dice?: string;
    spells?: string;
    hp?: string;
    ac?: string;
}

const useCharacterMutation = () => useMutation<void, Error, INewCharacter>(
  async ({
    name, 
    dice, 
    spells,
    hp,
    ac,
  }) => 
    fetch('http://localhost:8080/api/characters', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, 
        dice: dice.split(','),
        spells: spells.split(','),
        hp,
        ac
      }) 
    })
      .then( async(result) => {
        const json = await result.json()
        console.log(json)
        return json
      })
      .catch(() => console.error('Error uploading character')),
  {
    mutationKey: 'upload-character',
  })

export {
  useCharacterQuery,
  useCharacterMutation
}
