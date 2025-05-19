import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchPokemon, fetchPokemonList } from "@/api/pokemonList";

export const useGetPokemon = (pokemonName: string | null): UseQueryResult<any, any> => {
  return useQuery({
    queryKey: ['pokemon', pokemonName],
    queryFn: () => fetchPokemon(pokemonName),
  });
};

export const useGetPokemonPage = (page: number): UseQueryResult<any, any> => {
    const offset = page;
    return useQuery({
    queryKey: ['pokemonList', offset],
    queryFn: () => fetchPokemonList(offset),
  });
};




