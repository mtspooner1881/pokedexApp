import React from 'react';
import { pokemonBasicStatsType } from '@/app/types/pokemonSearchTypes';
import { PokemonBasicInfo } from './PokemonBasicInfo';
import { PokemonAbilities } from './PokemonAbilities';
import { PokemonStats } from './PokemonStats';
import { PokemonMoves } from './PokemonMoves';


interface pokemonInfoCardInterface {
  pokemonStats: pokemonBasicStatsType
}

export function PokemonInfoCard({
  pokemonStats
}: pokemonInfoCardInterface): React.JSX.Element {

  return (
    <section data-testid='infoCard-section' >
      <PokemonBasicInfo basicInfo={{...pokemonStats}} />
      <PokemonAbilities abilitiesInfo={pokemonStats.abilities} />
      <PokemonStats statsInfo={pokemonStats.stats} />
      <PokemonMoves movesInfo={pokemonStats.moves} />
    </section>
  );
}
