import React from "react";
import { pokemonListItemType } from "@/app/types/pokemonSearchTypes";

interface pokeboxInterface {
  pokemon: pokemonListItemType
  getSelectedPokemon: (selectedPokemon: string) => void
}

export function PokeBoxComponent({ pokemon, getSelectedPokemon }: pokeboxInterface): React.JSX.Element {
  function onClick(event: React.UIEvent): void {
    const target = event.currentTarget as typeof event.currentTarget & {
      value: string;
    };
    const pokemon = target.value;
    getSelectedPokemon(pokemon);
  }

  return (
    <section data-testid='pokeBox-component' className='mb-1 bg-white border-10 border-t-gray-100 border-b-gray-500 border-r-gray-300 border-l-gray-300 rounded-lg'>
      <div className='flex p-2'>
        <button 
          role='button' 
          aria-label={pokemon.name} 
          data-testid='pokeBox-button-component' 
          value={pokemon.url} 
          onClick={(event: React.UIEvent) => onClick(event)} 
          className='bg-red-500 text-red-500 w-15 h-15 border-10 border-t-red-200 border-b-red-900 border-r-red-300 border-l-red-300 rounded-lg cursor-pointer hover:shadow-[0_0_12px_-1px] hover:shadow-red-500 transition-shadow'>
            <img 
              src={'pokeball-pokemon-svgrepo-com.svg'} 
              alt='Pokeball'
            />
          </button>
        <div className='flex-1 text-black grid justify-items-center items-center text-gray-500 tracking-wider capitalize text-3xl font-bold text-shadow-[0_1px_0_rgba(255_255_255_.3), 0_-1px_0_rgba(0_0_0_.7)]'>{pokemon.name}</div>
      </div>
    </section>
  );
}