import React from 'react';
import { pokemonStatsType } from '@/app/types/pokemonSearchTypes';

interface pokemonStatsInterface {
  statsInfo: pokemonStatsType[]
}

export function PokemonStats({
  statsInfo
}: pokemonStatsInterface): React.JSX.Element {
  const statList = statsInfo.map((stat, index) => {
    const statName = stat.stat.name;
    const baseStat = stat.base_stat
    return <li className='uppercase' key={`${statName}-${index}`}>{statName}: {baseStat}</li>
  });

  return (
    <section data-testid='stats-section' className='bg-white text-gray-500 border border-gray-500 outline-white outline-4 mt-3 p-1 md:text-xl' >
      <div className='md:text-2xl border-b border-gray-500'>
        Stats:
      </div>
      <ul data-testid='stats-section-list' >
        {statList}
      </ul>
    </section>
  );
}