import React from 'react'
import {
  ISpell 
} from '../../hooks/useSpellsFilter'

export interface ISpellCardProps {
  spells: ISpell[];
}

export const SpellCards: React.FunctionComponent<ISpellCardProps> = ({
  spells
}) => {

  return (
    <div className={"row row-cols-1 row-cols-md-4 g-4"}>
      {
        spells && spells.map(
          (spell) => (
            <div 
              className={'col'}
              key={`${spell.identifier}-spell-card`}
            >
              <div
                className={"card mb-3"}
                style={{
                  maxWidth: '18rem'
                }}
              >
                <div
                  className={'card-body'}
                >
                  <h5 className={'card-title'}>
                    {spell.name}
                  </h5>
                  <p className={'card-text'}>{'Some spell text'}</p>
                </div>
              </div>
            </div>
          )
        )
      }
    </div>
  )
}
