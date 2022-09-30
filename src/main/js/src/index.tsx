import React from 'react'
import ReactDOM from 'react-dom'
import Axios from './api/axios'
import { useQuery } from 'react-query'
import { Character, ICharacterProps } from './components/Character'

const App = () => {

    const characterQuery = useQuery<ICharacterProps[], Error>({
        enabled: true,
        queryFn: async () => {
            const { data } = await Axios.get('/characters')

            return data
        },
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
                />
            ))
        }
        </div>
        )   
        
    } else {
        return <div> loading characters</div>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
