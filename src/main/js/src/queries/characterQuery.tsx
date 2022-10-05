import {
  useMutation,
  useQuery 
} from 'react-query'
import {
  ICharacterProps 
} from '../components/Character'
import Axios from '../api/axios'

const useCharacterQuery = () => useQuery<ICharacterProps[], Error>({
  enabled: true,
  queryFn: async () => Axios.get('/api/characters') //fetch('http://localhost:8080/api/characters')
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
    Axios.post('/api/characters/', {
    //fetch('http://localhost:8080/api/characters', {
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
