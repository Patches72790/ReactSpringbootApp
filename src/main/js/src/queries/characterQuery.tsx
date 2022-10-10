import {
  useMutation,
  useQuery 
} from 'react-query'
import Axios from '../api/axios'
import {
  spellifyString 
} from '../helpers/queryHelpers'
import {
  ISpell 
} from '../hooks/useSpellsFilter'

export interface ICharacterQuery {
  name: string;
  id: string;
  characterClass: string;
  spells: string;
}

export interface ICharacter {
    name: string;
    id: string;
    characterClass: string;
    spells: ISpell[];
}

const useCharacterQuery = () => useQuery<ICharacter[], Error, ICharacter[]>({
  enabled: true,
  queryFn: async () => {
    const response = await Axios.get<ICharacterQuery[]>('/api/characters')

    if (response.data) {
      return response.data.map(({
        spells, ...rest
      }) => ({
        ...rest,
        spells: spells.split(',').map(spellifyString)
      }))
    } else {
      throw new Error("Error retrieving character data")
    }
  },
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
    Axios.request( 
      {
        url: '/api/characters/',
        method: 'POST',
        headers: {
        //'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          name, 
          spells,
          characterClass
        }
      }
    )
      .then(({
        data 
      }) => {
        return data
      })
      .catch(() => console.error('Error uploading character')),
  {
    mutationKey: 'upload-character',
  }
)

export const useDeleteCharacterQuery = () => useMutation<void, Error, string>(
  async(
    id
  ) =>
    Axios.delete(`/api/characters/${id}`),
  {
    mutationKey: 'delete-character',
    onError: () => console.error('Error deleting character')
  },
)

export {
  useCharacterQuery,
  useCharacterMutation
}
