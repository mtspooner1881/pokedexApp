'use client'
import React from "react";
import { PokedexListComponent } from "@/components/pokedexList/PokedexListComponent"; 

interface pokedexScreenInterface {
  getSelectedPokemon: (selctedPokemon: string) => void;
}

export function PokedexScreen({ getSelectedPokemon }: pokedexScreenInterface): React.JSX.Element {

  return (
    <div data-testid={'pokedex-screen'} className='flex-1' >
      <PokedexListComponent getSelectedPokemon={getSelectedPokemon} />
    </div>
  );
}
