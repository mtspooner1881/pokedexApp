import React from "react";
import { PokedexListComponent } from "@/components/pokedexList/PokedexListComponent"; 

interface pokedexScreenInterface {
  getSelectedPokemon: (selctedPokemon: string) => void;
  pageNumber?: string | null;
}

export function PokedexScreen({ getSelectedPokemon, pageNumber }: pokedexScreenInterface): React.JSX.Element {

  return (
    <div data-testid={'pokedex-screen'} className='flex-1' >
      <PokedexListComponent getSelectedPokemon={getSelectedPokemon} pageNumber={pageNumber} />
    </div>
  );
}
