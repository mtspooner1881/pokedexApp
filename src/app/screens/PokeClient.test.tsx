import { PokeClient } from './PokeClient';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { pokemonDetailData, pokemonListData, pokemonListDataNewPage } from '@/testData/pokemonMockData';
import React from 'react';
import nock from 'nock';
window.scrollTo = jest.fn();
const getMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  }),
  useSearchParams: () => ({
    get: getMock
  }),
  usePathname: () => '/'
}));

describe('#PokeClient', () => {
  afterEach(() => {
    nock.cleanAll();
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
    nock.cleanAll();
    nock.restore();
  });
  it('should render pokedex screen if there is no pokemon data', async() => {
    render(<QueryClientProvider client={new QueryClient()}><PokeClient/></QueryClientProvider>);
    await waitFor(() => {
      const pokeclient = screen.getByTestId('pokeclient-page');
      const pokeclientPokedex = screen.getByTestId('pokedex-screen');
      expect(pokeclient).toBeInTheDocument();
      expect(pokeclientPokedex).toBeInTheDocument();
    });
  });

  it('should render pokemon details screen if there is pokemon data', async () => {
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/?limit=60&offset=0')
      .reply(200, pokemonListData);
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/ditto')
      .reply(200, pokemonDetailData);
    render(<QueryClientProvider client={new QueryClient()}><PokeClient/></QueryClientProvider>);
    await waitFor(() => {
      const pokeclient = screen.getByTestId('pokeclient-page');
      expect(pokeclient).toBeInTheDocument();
    });

    await waitFor(() => {
      const pokedexList = screen.getByTestId('pokedexlist-component-list');
      const dittoButton = pokedexList.querySelector('li:first-child button')!;
      expect(dittoButton).toBeInTheDocument();
      fireEvent.click(dittoButton);
    });

    await waitFor(() => {
      const pokeclientPokemonDetails = screen.getByTestId('pokemonDetails-screen');
      expect(pokeclientPokemonDetails).toBeInTheDocument();
    });
  });

  it('should go back to pokedex when back button is clicked', async () => {
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/?limit=60&offset=0')
      .reply(200, pokemonListData);
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/ditto')
      .reply(200, pokemonDetailData);
    render(<QueryClientProvider client={new QueryClient()}><PokeClient/></QueryClientProvider>);
    await waitFor(() => {
      const pokeclient = screen.getByTestId('pokeclient-page');
      expect(pokeclient).toBeInTheDocument();
    });

    await waitFor(() => {
      const pokedexList = screen.getByTestId('pokedexlist-component-list');
      const dittoButton = pokedexList.querySelector('li:first-child button')!;
      expect(dittoButton).toBeInTheDocument();
      fireEvent.click(dittoButton);
    });

    await waitFor(() => {
      const pokeclientPokemonDetails = screen.getByTestId('pokemonDetails-screen');
      const pokemonDetailsBackButton = screen.getByTestId('pokemonDetails-screen-backButton')!;
      expect(pokeclientPokemonDetails).toBeInTheDocument();
      expect(pokemonDetailsBackButton).toBeInTheDocument();
      fireEvent.click(pokemonDetailsBackButton);
    });

    await waitFor(() => {
        const pokeclientPokedex = screen.getByTestId('pokedex-screen');
        expect(pokeclientPokedex).toBeInTheDocument();
    });
  });

    it('should navigate when pagination is clicked', async () => {
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/?limit=60&offset=0')
      .reply(200, pokemonListData);
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/?limit=60&offset=1')
      .reply(200, pokemonListDataNewPage);
    render(<QueryClientProvider client={new QueryClient()}><PokeClient/></QueryClientProvider>);
    await waitFor(() => {
      const pokeclient = screen.getByTestId('pokeclient-page');
      expect(pokeclient).toBeInTheDocument();
    });

    await waitFor(() => {
      const ditto = screen.getByText('ditto');
      const nextButton = screen.getByTestId('pagination-next-button');
      expect(ditto).toBeInTheDocument();
      fireEvent.click(nextButton);
    });

    await waitFor(() => {
      const charmander = screen.getByText('charmander');
      const previousButton = screen.getByTestId('pagination-previous-button');
      expect(charmander).toBeInTheDocument();;
      fireEvent.click(previousButton);
    });

    await waitFor(() => {
      const ditto = screen.getByText('ditto');
      expect(ditto).toBeInTheDocument();
    });
  });

  it('should navigate to the correct pokemon when there is a pokedexNumber search param', async () => {
    getMock.mockReturnValue('3');
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/3/')
      .reply(200, pokemonDetailData);
    render(<QueryClientProvider client={new QueryClient()}><PokeClient/></QueryClientProvider>);
    await waitFor(() => {
      const pokeclientPokemonDetails = screen.getByTestId('pokemonDetails-screen');
      expect(pokeclientPokemonDetails).toBeInTheDocument();
    });
  });

  it('should call the audio player when pikachu is selected', async () => {
    pokemonDetailData.name = 'pikachu';
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/?limit=60&offset=0')
      .reply(200, pokemonListData);
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/pikachu')
      .reply(200, pokemonDetailData);
    render(<QueryClientProvider client={new QueryClient()}><PokeClient/></QueryClientProvider>);
    await waitFor(() => {
      const pokeclient = screen.getByTestId('pokeclient-page');
      expect(pokeclient).toBeInTheDocument();
    });
    await waitFor(() => {
      const pokedexList = screen.getByTestId('pokedexlist-component-list');
      const pickachuButton = pokedexList.querySelectorAll('li')[1].querySelector('button')!;
      expect(pickachuButton).toBeInTheDocument();
      fireEvent.click(pickachuButton);
    });

    await waitFor(() => {
      const mockAudio = jest
        .spyOn(window.HTMLMediaElement.prototype, 'play')
        .mockImplementation(() => Promise.resolve())
      const pokeclientPokemonDetails = screen.getByTestId('pokemonDetails-screen');
      expect(mockAudio).toHaveBeenCalled();
      expect(pokeclientPokemonDetails).toBeInTheDocument();
    });
  });

  it('should call the audio player when psyduck is selected', async () => {
    pokemonDetailData.name = 'psyduck';
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/?limit=60&offset=0')
      .reply(200, pokemonListData);
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/pikachu')
      .reply(200, pokemonDetailData);
    render(<QueryClientProvider client={new QueryClient()}><PokeClient/></QueryClientProvider>);
    await waitFor(() => {
      const pokeclient = screen.getByTestId('pokeclient-page');
      expect(pokeclient).toBeInTheDocument();
    });
    await waitFor(() => {
      const pokedexList = screen.getByTestId('pokedexlist-component-list');
      const psyduckButton = pokedexList.querySelectorAll('li')[1].querySelector('button')!;
      expect(psyduckButton).toBeInTheDocument();
      fireEvent.click(psyduckButton);
    });

    await waitFor(() => {
      const mockAudio = jest
        .spyOn(window.HTMLMediaElement.prototype, 'play')
        .mockImplementation(() => Promise.resolve())
      const pokeclientPokemonDetails = screen.getByTestId('pokemonDetails-screen');
      expect(mockAudio).toHaveBeenCalled();
      expect(pokeclientPokemonDetails).toBeInTheDocument();
    });
  });
  
  it('should call the audio player when meowth is selected', async () => {
    pokemonDetailData.name = 'meowth';
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/?limit=60&offset=0')
      .reply(200, pokemonListData);
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/pikachu')
      .reply(200, pokemonDetailData);
    render(<QueryClientProvider client={new QueryClient()}><PokeClient/></QueryClientProvider>);
    await waitFor(() => {
      const pokeclient = screen.getByTestId('pokeclient-page');
      expect(pokeclient).toBeInTheDocument();
    });

    await waitFor(() => {
      const pokedexList = screen.getByTestId('pokedexlist-component-list');
      const meowthButton = pokedexList.querySelectorAll('li')[1].querySelector('button')!;
      expect(meowthButton).toBeInTheDocument();
      fireEvent.click(meowthButton);
    });

    await waitFor(() => {
      const mockAudio = jest
        .spyOn(window.HTMLMediaElement.prototype, 'play')
        .mockImplementation(() => Promise.resolve())
      const pokeclientPokemonDetails = screen.getByTestId('pokemonDetails-screen');
      expect(mockAudio).toHaveBeenCalled();
      expect(pokeclientPokemonDetails).toBeInTheDocument();
    });
  });

  // it('should render error correctly', async () => {
  //   nock('https://pokeapi.co/api/v2')
  //     .get('/pokemon/?limit=60&offset=0')
  //     .delay(50)
  //     .replyWithError({ message: 'Something went wrong', code: 'ERROR_CODE', metadata: { details: '...' } });
  //   render(<QueryClientProvider client={new QueryClient()}><PokeClient/></QueryClientProvider>);
  //   await waitFor(() => {
  //     const errorScreen = screen.getByTestId('systemInfoCard-content-error');
  //     expect(errorScreen.innerHTML).toContain('Catching Pokemon');
  //   }, { interval: 10 });
  // });
});