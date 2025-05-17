export const fetchPokemon = async (pokemonName: string | null) => {
    if (!pokemonName) {
      return null;
    }
    const res = await fetch(pokemonName);
    return res.json();
};

export const fetchPokemonList = async (offset: number) => {
  const res = await fetch (`https://pokeapi.co/api/v2/pokemon/?limit=60&offset=${offset}`);
  return res.json();
}