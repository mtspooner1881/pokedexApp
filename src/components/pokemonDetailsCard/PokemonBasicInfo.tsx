import React from 'react';
import { pokemonBasicStatsType } from '@/app/types/pokemonSearchTypes';
import { PokemonType } from './PokemonType';

interface pokemonInfoCardInterface {
  basicInfo: pokemonBasicStatsType
}

export function PokemonBasicInfo({
  basicInfo
}: pokemonInfoCardInterface): React.JSX.Element {
  return (
    <section data-testid='basicInfo-section' className='capitalize bg-white text-gray-500 border border-gray-500 outline-white outline-4'>
      <div className='flex flex-1 m-1 md:text-3xl'>
        <div className='flex-1' data-testid='basicInfo-section-id'>
          Number: {basicInfo.id}
        </div>
        <h2 className='flex-1' data-testid='basicInfo-section-name'>
          Name: {basicInfo.name}
        </h2>
      </div>
      <div className='flex md:text-2xl'>
        <div className='border border-gray-500 m-1'>
          <img data-testid='basicInfo-section-image' src={basicInfo.sprites?.front_default} alt={`${basicInfo.name} Sprite`} />
        </div>
        <div className='flex-1 content-center'>
          <div data-testid='basicInfo-section-height'>
            Height: {basicInfo.height}
          </div>
          <div data-testid='basicInfo-section-weight'>
            Weight: {basicInfo.weight}
          </div>
        </div>
        <PokemonType typeInfo={basicInfo.types} />
      </div>
    </section>
  );
}