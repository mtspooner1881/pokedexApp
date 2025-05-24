import React from 'react';
import { pokemonAbilitiesType } from '@/app/types/pokemonSearchTypes';

interface pokemonAbilitiesInterface {
  abilitiesInfo: pokemonAbilitiesType[];
}

export function PokemonAbilities({
  abilitiesInfo
}: pokemonAbilitiesInterface): React.JSX.Element {

  const abilityList: React.JSX.Element[] = abilitiesInfo.map((ability, index) => {
    const abilityName = ability.ability.name;
    return <li className='capitalize' key={`${abilityName}-${index}`}>{abilityName}</li>
  });

  return (
    <section data-testid='abilities-section' className='bg-white text-gray-500 border border-gray-500 outline-white outline-4 mt-3 p-1 md:text-xl'>
      <h3 className='md:text-2xl border-b border-gray-500'>
        Abilities:
      </h3>
      <ul data-testid='abilities-section-list' className='grid grid-cols-2 gap-1' >
        {abilityList}
      </ul>
    </section>
  );
}