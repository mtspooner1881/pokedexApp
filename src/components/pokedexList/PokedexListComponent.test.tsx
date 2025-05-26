import React from "react";
import '@testing-library/jest-dom';
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { pokemonListData } from "@/testData/pokemonMockData";
import { PokedexListComponent } from "./PokedexListComponent";
import nock from 'nock';

const getMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  }),
  usePathname: () => '/',
  useSearchParams: () => ({
    get: getMock
  })
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
      staleTime: 0
    }
  }
});
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('#PokedexListComponent', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  afterAll(() => {
    nock.cleanAll();
    nock.restore();
  });

  it('should render pokemon list with data', async () => {
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/?limit=60&offset=0')
      .once()
      .reply(200, pokemonListData);
    render(<PokedexListComponent getSelectedPokemon={jest.fn()} />, {wrapper});
    const loadingScreen = screen.getByTestId('systemInfoCard-content-loading');
    expect(loadingScreen.innerHTML).toContain('Catching Pokemon');
    await waitFor(() => {
      const pokemonList = screen.getByTestId('pokedexlist-component-list');
      expect(pokemonList).toBeInTheDocument();
      const pokemonListItems = pokemonList.querySelectorAll('li');
      expect(pokemonListItems.length).toBe(3);
    });
  });

  it('should go to the correct page if there is a pagenumber', async () => {
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/?limit=60&offset=60')
      .once()
      .reply(200, pokemonListData);
    render(<PokedexListComponent getSelectedPokemon={jest.fn()} pageNumber={60} />, {wrapper});
    const loadingScreen = screen.getByTestId('systemInfoCard-content-loading');
    expect(loadingScreen.innerHTML).toContain('Catching Pokemon');
    await waitFor(() => {
      const pokemonList = screen.getByTestId('pokedexlist-component-list');
      expect(pokemonList).toBeInTheDocument();
      const pokemonListItems = pokemonList.querySelectorAll('li');
      expect(pokemonListItems.length).toBe(3);
    });
  });

  it('should render error correctly', async () => {
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/?limit=60&offset=0')
      .replyWithError({ message: 'Server ERROR' });
    render(<PokedexListComponent getSelectedPokemon={jest.fn()} />, {wrapper});
    await waitFor(() => {
      const errorScreen = screen.getByTestId('systemInfoCard-content-error');
      expect(errorScreen.innerHTML).toContain('Cannot find any Pokemon');
    });
  });
});