import React from 'react'

export interface ICharacterProps  {
    name: string,
    hp: number,
    ac: number
}

export const Character: React.FunctionComponent<ICharacterProps> = ({
    name,
    hp,
    ac
}) => (
    <div >
        <p>Name: {name}</p>
        <p>HP: {hp}</p>
        <p>AC: {ac}</p>
    </div>
)
