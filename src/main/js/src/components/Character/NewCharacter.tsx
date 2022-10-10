import React from 'react'
import {
  useQueryClient 
} from 'react-query'
import {
  useCharacterMutation 
} from '../../queries/characterQuery'
import {
  useClassQuery 
} from '../../queries/classQuery'
import {
  EditCharacter 
} from './EditCharacter'

export const NewCharacter = () => {
  const queryClient = useQueryClient()
  const createCharacter = useCharacterMutation(queryClient)
  const classQueryResult = useClassQuery()

  return (
    <div className={'row'}>
      <button 
        type='button'
        className={'btn btn-primary'}
        data-toggle={'collapse'}
        data-target={'#collapseNewCharacter'}
      >
        {'New Character'}
      </button>
      <div 
        className={'collapse row'}
        id={'collapseNewCharacter'}
      >
        <EditCharacter 
          mutateCharacters={createCharacter}
          classQuery={classQueryResult}
          characterClass={''}
          characterName={''}
          spells={[]}
        />
      </div>
    </div>
  )
}
