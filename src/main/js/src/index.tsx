import React from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'
import { useQuery } from 'react-query'
import { Character } from './components/Character'

const App = () => {

    const characterQuery = useQuery({
        enabled: true,
        queryFn: async () => {

        },
        queryKey: ['characters']
    })

return (
    <Character/>
)
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)
