import React from 'react';
import { pokemonMovesType } from '@/app/types/pokemonSearchTypes';

interface pokemonMovesInterface {
  movesInfo: pokemonMovesType[]
}

export function PokemonMoves({
  movesInfo
}: pokemonMovesInterface): React.JSX.Element {
  const moveList: React.JSX.Element[] = movesInfo.map((move, index) => {
    const moveName = move.move.name;
    return <li className='capitalize flex-1' key={`${moveName}-${index}`}>{moveName}</li>
  });

  return (
    <section data-testid={'moves-section'} className='bg-white text-gray-500 border border-gray-500 outline-white outline-4 mt-3 p-1 md:text-xl' >
      <div className='md:text-2xl border-b border-gray-500'>
        Moves:
      </div>
      <ul data-testid={'moves-section-list'} className='grid grid-cols-3 gap-1' >
        {moveList}
      </ul>
    </section>
  );
}