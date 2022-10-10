import {
  ISpell
} from '../hooks/useSpellsFilter'

export const spellifyString = (name: string): ISpell => ({
  identifier: name,
  name: name.split('-')
    .map(namePiece => namePiece.charAt(0).toUpperCase() + namePiece.slice(1))
    .join(' ')
})
