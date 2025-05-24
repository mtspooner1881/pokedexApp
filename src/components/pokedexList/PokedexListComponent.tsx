'use client'
import React, { useState } from "react";
import { PokeBoxComponent } from './PokeBoxComponent';
import { SystemInfoCard } from "../sharedComponents/SystemInfoCard";
import { useGetPokemonPage } from '@/hooks/useGetPokemon';
import { pokemonListItemType } from "@/app/types/pokemonSearchTypes";

interface pokedexListInterface {
  getSelectedPokemon: (selctedPokemon: string) => void;
}

export function PokedexListComponent({
  getSelectedPokemon,
}: pokedexListInterface): React.JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { data, isLoading, isError } = useGetPokemonPage(currentPage);
  const pokemonListItems = data?.results.map((pokemonResults: pokemonListItemType, index: number) => {
    const pokemon = pokemonResults;
    return (
      <li key={`${pokemon?.name}-${index}`} className=''>
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

  if(isLoading) {
    return (
      <div className='flex min-h-full' >
        <SystemInfoCard infoType={'loading'} >Catching Pokemon</SystemInfoCard>
      </div>
    );
  }

  if(isError) {
    return (
      <div className='flex min-h-full' >
        <SystemInfoCard infoType={'error'} >Cannot find any Pokemon</SystemInfoCard>
      </div>
    );
  }

  return (
    <div data-testid='pokedexlist-component' className='flex-1' >
      <div className='flex-1 capitalize bg-white text-gray-500 border border-gray-500 outline-white outline-4 content-center my-5'>
        <h1 className='text-4xl text-center'>Pokedex</h1>
      </div>
      <ul data-testid='pokedexlist-component-list' className='flex-1 grid md:grid-cols-2 lg:grid-cols-3 gap-2'>
          {pokemonListItems}
      </ul>
      <div className='flex text-3xl my-5'>
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