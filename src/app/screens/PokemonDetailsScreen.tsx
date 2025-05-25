import React, { useEffect } from "react";
import { PokemonInfoCard } from "@/components/pokemonDetailsCard/PokemonInfoCard";
import { pokemonBasicStatsType } from '@/app/types/pokemonSearchTypes';

interface pokemonDetailsScreenInterface {
  pokemonStats: pokemonBasicStatsType;
  clearSelectedPokemon: () => void;
}

export function PokemonDetailsScreen({
  clearSelectedPokemon,
  pokemonStats
}: pokemonDetailsScreenInterface): React.JSX.Element {
  let audioFile;
  window.scrollTo(0, 0);
  switch (pokemonStats.name) {
    case 'pikachu':
      audioFile = 'pikachu.mp3';
      break;
    case 'psyduck':
      audioFile = 'psyduck.mp3';
      break;
    case 'meowth':
      audioFile = 'teamrocket.mp3';
      break;   
  }
  const audio = new Audio(audioFile);
  const playIt = () => {
    const pokemonName = pokemonStats.name;
    if (pokemonName === 'pikachu' || pokemonName === 'psyduck' || pokemonName === 'meowth') {
      audio.play();
    }
  }; 

  useEffect(() => playIt(), []);


  return (
    <div data-testid={'pokemonDetails-screen'} className='flex-1' >
      <button role='button' data-testid={'pokemonDetails-screen-backButton'} className='text-3xl cursor-pointer focus:text-blue-500 hover:text-blue-500' onClick={() => clearSelectedPokemon()}>Back to Pokedex &gt;</button>
      <div className='flex content-center my-3'>
        <div className='flex-1 capitalize bg-white text-gray-500 border border-gray-500 outline-white outline-4 content-center'>
          <h1 className='text-4xl text-center'>{pokemonStats.name}</h1>
        </div>
      </div>
      <PokemonInfoCard pokemonStats={pokemonStats}/>
    </div>
  );
}