import React from 'react'
import {
  UseQueryResult 
} from 'react-query'
import {
  ISpellsQuery 
} from '../queries/spellsQuery'

export interface ISpellDropdownProps {
  spellQueryResult: UseQueryResult<ISpellsQuery, Error>;
}

export const SpellDropdown: React.FunctionComponent<ISpellDropdownProps> = 
({
  spellQueryResult
}) => (
  <div 
    className={"dropdown"}
  >
    <button 
      className={"btn btn-secondary dropdown-toggle"}
      type="button"
      id="dropdownMenuButton"
      data-toggle="dropdown"
    >
      {"Spells List"}
    </button>
    <div className={"dropdown-menu"}>
      {spellQueryResult.isSuccess && spellQueryResult
        .data
        .results
        .map(result => 
          <a 
            className={"dropdown-item"}
            key={`${result.name}-key`}
          >
            {JSON.stringify(result)}
          </a>)
      } 
    </div>
  </div>

)
