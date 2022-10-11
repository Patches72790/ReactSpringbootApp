import React, {
  useMemo 
} from 'react'
import {
  ISpell 
} from '../../hooks/useSpellsFilter'
import {
  useSpellFactsQueries,
} from '../../queries/spellsQuery'

export interface ISpellCardProps {
  spells: ISpell[];
}

export const SpellCards: React.FunctionComponent<ISpellCardProps> = ({
  spells
}) => {

  const spellFactsQueries = useSpellFactsQueries(spells)

  console.log(spellFactsQueries)
  return useMemo(() => spellFactsQueries.every(({
    isSuccess 
  }) => isSuccess) && (
    <div className={"row row-cols-1 row-cols-md-4 g-4"}>
      {
        spellFactsQueries && spellFactsQueries.map(
          ({
            data: {
              name,
              index,
              level,
              attack_type,
              desc
            }
          }) => (
            <div 
              className={'col'}
              key={`${index}-spell-card`}
            >
              <div
                className={"card mb-3"}
                style={{
                  maxWidth: '18rem',
                  maxHeight: '18rem',
                  overflow: 'auto'
                }}
              >
                <div
                  className={'card-body'}
                >
                  <h5 className={'card-title'}>
                    {name}
                  </h5>
                  <p className={'card-text fs-6'}>{`Spell Level: ${level}`}</p>
                  <p className={'card-text fs-6'}>{`Description: ${desc}`}</p>
                </div>
              </div>
            </div>
          )
        )
      }
    </div>
  ), [spellFactsQueries])
}
