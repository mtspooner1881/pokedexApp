'use client'
import React, { useState } from "react";
import { PokeBoxComponent } from '../sharedComponents/PokeBoxComponent';
import { useGetPokemonPage } from '@/hooks/useGetPokemon';
import { pokemonListItemType } from "@/app/types/pokemonSearchTypes";

interface pokedexListInterface {
  getSelectedPokemon: (selctedPokemon: string) => void;
}

export function PokedexListComponent({
  getSelectedPokemon,
}: pokedexListInterface): React.JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { data } = useGetPokemonPage(currentPage);
  const pokemonListItems = data?.results.map((pokemonResults: pokemonListItemType, index: number) => {
    const pokemon = pokemonResults;
    return (
      <li key={`${pokemon?.name}-${index}`}>
        <PokeBoxComponent pokemon={pokemon} getSelectedPokemon={getSelectedPokemon} />
      </li>
    );
  });

  function onPrevClick(): void {
    const prevUrl = data.previous; 
    onNavigationClick(prevUrl);
  }

  function onNextClick(): void {
    const nextUrl = data.next;
    onNavigationClick(nextUrl);
  }

  function onNavigationClick(url: string): void {
    const pageUrl = new URL(url); 
    const newPage = Number(pageUrl.searchParams.get('offset'));
    setCurrentPage(newPage);
  }

  return (
    <div data-testid='pokedexlist-component' className='flex-1' >
      <ul data-testid='pokedexlist-component-list' className='flex-1'>
        {pokemonListItems}
      </ul>
      <div className='flex text-xl'>
        {!!data?.previous && 
          <button 
            role='button' 
            className='cursor-pointer flex-1'
            data-testid='pagination-previous-button' 
            onClick={onPrevClick}>
              &lt; Previous Page
          </button>
        }
        {!!data?.next && 
          <button 
            role='button' 
            className='cursor-pointer flex-1'
            data-testid='pagination-next-button' 
            onClick={onNextClick}>
              Next Page &gt;
          </button>
        }
      </div>
    </div>
  );
}