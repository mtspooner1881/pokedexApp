'use client'
import { useGetPokemon } from '@/hooks/useGetPokemon';
import { PokedexScreen } from './PokedexScreen';
import { PokemonDetailsScreen } from './PokemonDetailsScreen'; 
import { useState } from 'react';
import { useKonami } from 'react-konami-code';
import useSound from 'use-sound';

export function PokeClient() {
  const [ selectedPokemon, setSelectedPokemon ] = useState<string>('');
  const { data } = useGetPokemon(selectedPokemon);

  const [play] = useSound('/01_16.mp3', { volume: 0.25 });

  useKonami(play);

  function getSelectedPokemon(selectedPokemon: string) {
    setSelectedPokemon(selectedPokemon);
  }

  function clearSelectedPokemon() {
    setSelectedPokemon('');
  }


  
  return (
    <div data-testid={'pokeclient-page'} className='flex-1'>
      <div className='w-full bg-red-500 mx-auto max-w-screen-sm pr-10 pl-10 md:pr-25 md:pl-25 md:max-w-screen-md'>
        {!!data ? (
          <PokemonDetailsScreen 
            clearSelectedPokemon={clearSelectedPokemon}
            pokemonStats={{...data}}
          />
        ) : (
          <PokedexScreen
            getSelectedPokemon={getSelectedPokemon}
          />
        )}
      </div>
    </div>
  );
}
