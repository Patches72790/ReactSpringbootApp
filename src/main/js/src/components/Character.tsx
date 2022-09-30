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
        <p>{name}</p>
        <p>{hp}</p>
        <p>{ac}</p>
    </div>
)
