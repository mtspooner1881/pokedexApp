'use client'
import React, { useEffect } from 'react';
import { useGetPokemon } from '@/hooks/useGetPokemon';
import { PokedexScreen } from './PokedexScreen';
import { PokemonDetailsScreen } from './PokemonDetailsScreen'; 
import { SystemInfoCard } from '@/components/sharedComponents/SystemInfoCard';
import { useState } from 'react';
import { useKonami } from 'react-konami-code';
import useSound from 'use-sound';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function PokeClient(): React.JSX.Element {
  const [ selectedPokemon, setSelectedPokemon ] = useState<string>('');
  const { data, isLoading, isError } = useGetPokemon(selectedPokemon);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [play] = useSound('/01_16.mp3', { volume: 0.25 });
  const sharedPokedexNumber = searchParams.get('pokedexNumber');

  useEffect(() => {
    loadSharedPokemon();
  }, []);

  useKonami(play);

  function getSelectedPokemon(selectedPokemon: string): void {
    setSelectedPokemon(selectedPokemon);
  }

  function clearSelectedPokemon(): void {
    router.push(pathname);
    setSelectedPokemon('');
  }

  function loadSharedPokemon(): void {
    if (sharedPokedexNumber) {
      const sharedPokemon = `https://pokeapi.co/api/v2/pokemon/${sharedPokedexNumber}/`
      setSelectedPokemon(sharedPokemon);
    }
  }

  if(isLoading) {
    return (
      <div className='flex w-full bg-red-500 mx-auto max-w-screen-sm pr-10 pl-10 md:pr-25 md:pl-25 md:max-w-screen-md min-h-full' >
        <SystemInfoCard infoType={'loading'} >Catching Pokemon</SystemInfoCard>
      </div>
    );
  }

  if(isError) {
    return (
      <div className='flex w-full bg-red-500 mx-auto max-w-screen-sm pr-10 pl-10 md:pr-25 md:pl-25 md:max-w-screen-md min-h-full' >
        <SystemInfoCard infoType={'error'} >Cannot find any Pokemon</SystemInfoCard>
      </div>
    );
  }

  return (
    <div data-testid={'pokeclient-page'} className='flex-1 min-h-full'>
      <div className='flex w-full bg-red-500 mx-auto max-w-screen-sm pr-10 pl-10 md:pr-25 md:pl-25 md:max-w-screen-md lg:max-w-screen-lg min-h-full'>
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
