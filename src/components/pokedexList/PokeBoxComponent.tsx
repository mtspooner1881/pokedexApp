import React from "react";
import { pokemonListItemType } from "@/app/types/pokemonSearchTypes";
import { useRouter, usePathname } from 'next/navigation';

interface pokeboxInterface {
  pokemon: pokemonListItemType
  getSelectedPokemon: (selectedPokemon: string) => void
}

export function PokeBoxComponent({ pokemon, getSelectedPokemon }: pokeboxInterface): React.JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  function onClick(event: React.UIEvent): void {
    const target = event.currentTarget as typeof event.currentTarget & {
      value: string;
    };
    const pokemon = target.value;
    const fetchUrl = new URL(pokemon);
    const path = fetchUrl.pathname;
    const pokemonNumber = path.split('/').slice(-2, -1).pop();
    router.push(`${pathname}?pokedexNumber=${pokemonNumber}`);
    getSelectedPokemon(pokemon);
  }

  return (
    <section data-testid='pokeBox-component' className='flex bg-white border-10 border-t-gray-100 border-b-gray-500 border-r-gray-300 border-l-gray-300 rounded-lg outline outline-gray-800'>
      <button 
        role='button' 
        aria-label={pokemon.name} 
        data-testid='pokeBox-button-component' 
        value={pokemon.url} 
        onClick={(event: React.UIEvent) => onClick(event)}
        className='group flex flex-1 p-3 justify-center cursor-pointer outline outline-gray-300 focus:shadow-[0_0_12px_-1px] hover:shadow-[0_0_12px_-1px]'
      >
        <div  
          className='flex-none bg-red-500 text-red-500 w-15 h-15 border-10 border-t-red-200 border-b-red-900 border-r-red-300 border-l-red-300 rounded-lg group-focus:shadow-[0_0_12px_-1px] group-focus:shadow-red-500 group-focus:bg-red-300 group-hover:shadow-[0_0_12px_-1px] group-hover:shadow-red-500 group-hover:bg-red-300 transition-shadow transition-colors content-center outline outline-gray-800'>
            <img 
              src={'pokeball-pokemon-svgrepo-com.svg'} 
              alt='Pokeball'
              height={30}
              width={30}
              className='mx-auto'
            />
          </div>
        <div className='flex-1 text-black grid justify-items-center items-center text-gray-800 tracking-wider capitalize text-3xl font-bold text-shadow-[0_1px_0_rgba(255_255_255_.3), 0_-1px_0_rgba(0_0_0_.7)] group-hover:text-blue-500 group-focus:text-blue-500 transition-colors'>{pokemon.name}</div>
      </button>
    </section>
  );
}