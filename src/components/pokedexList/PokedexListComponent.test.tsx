import React from "react";
import '@testing-library/jest-dom';
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { pokemonListData } from "@/testData/pokemonMockData";
import { PokedexListComponent } from "./PokedexListComponent";
import nock from 'nock';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('#PokedexListComponent', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('should render pokemon list with data', async () => {
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/?limit=60&offset=0')
      .reply(200, pokemonListData);
    render(<PokedexListComponent getSelectedPokemon={jest.fn()} />, {wrapper});

    const pokemonList = screen.getByTestId('pokedexlist-component-list');
    expect(pokemonList).toBeInTheDocument();

    await waitFor(() => {
      const pokemonListItems = pokemonList.querySelectorAll('li');
      expect(pokemonListItems.length).toBe(3);
    });
  });

  // it('should not render pokemon list with no data', async () => {
  //   nock('https://pokeapi.co/api/v2')
  //     .get('/pokemon/?limit=60&offset=0')
  //     .reply(200, {});
  //   render(<PokedexListComponent getSelectedPokemon={jest.fn()} />, {wrapper});

  //   const pokemonList = screen.getByTestId('pokedexlist-component-list');
  //   expect(pokemonList).toBeInTheDocument();

  //   await waitFor(() => {
  //     const pokemonListItems = pokemonList.querySelectorAll('li');
  //     expect(pokemonListItems.length).toBe(0);
  //   });
  // });
});