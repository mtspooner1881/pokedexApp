import { useQuery } from "@tanstack/react-query";
import { fetchPokemon, fetchPokemonList } from "@/api/pokemonList";

export const useGetPokemon = (pokemonName: string | null) => {
  return useQuery({
    queryKey: ['pokemon', pokemonName],
    queryFn: () => fetchPokemon(pokemonName),
  });
};

export const useGetPokemonPage = (page: number) => {
    const offset = page;
    return useQuery({
    queryKey: ['pokemonList', offset],
    queryFn: () => fetchPokemonList(offset),
  });
};




