export const fetchPokemon = async (pokemonName: string | null): Promise<JSON | null> => {
    if (!pokemonName) {
      return null;
    }
    const res: Response = await fetch(pokemonName);
    return res.json();
};

export const fetchPokemonList = async (offset: number): Promise<JSON> => {
  const res: Response = await fetch (`https://pokeapi.co/api/v2/pokemon/?limit=60&offset=${offset}`);
  return res.json();
}