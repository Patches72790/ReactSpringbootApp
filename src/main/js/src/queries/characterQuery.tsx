import {
  useMutation,
  useQuery 
} from 'react-query'
import Axios from '../api/axios'

export interface ICharacterQuery {
  name: string;
  id: string;
  hp: number;
  ac: number;
}

const useCharacterQuery = () => useQuery<ICharacterQuery[], Error>({
  enabled: true,
  queryFn: async () => Axios.get('/api/characters')
    .then(data => {
      console.log(data)
      return data
    })
    .then(({
      data: {
        _embedded: {
          characters 
        } 
      }
    }) => characters)
    .catch(console.error),
  queryKey: ['characters']
})

export interface INewCharacter {
    name?: string;
    spells?: string[];
    characterClass?: string;
}

const useCharacterMutation = () => useMutation<void, Error, INewCharacter>(
  async ({
    name, 
    spells,
    characterClass
  }) => 
    Axios.post('/api/characters/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, 
        spells: spells.join(','),
        characterClass
      }) 
    })
      .then( async({
        data 
      }) => {
        return data
      })
      .catch(() => console.error('Error uploading character')),
  {
    mutationKey: 'upload-character',
  })

export {
  useCharacterQuery,
  useCharacterMutation
}
