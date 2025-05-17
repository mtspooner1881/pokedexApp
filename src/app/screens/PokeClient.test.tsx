import { PokeClient } from './PokeClient';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { pokemonDetailData, pokemonListData, pokemonListDataNewPage } from '@/testData/pokemonMockData';
import React from 'react';
import nock from 'nock';

describe('#PokeClient', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('should render pokedex screen if there is no pokemon data', () => {
    render(<QueryClientProvider client={new QueryClient()}><PokeClient/></QueryClientProvider>);
    const pokeclient = screen.getByTestId('pokeclient-page');
    const pokeclientPokedex = screen.getByTestId('pokedex-screen');
    expect(pokeclient).toBeInTheDocument();
    expect(pokeclientPokedex).toBeInTheDocument();
  });

  it('should render pokemon details screen if there is pokemon data', async () => {
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/?limit=60&offset=0')
      .reply(200, pokemonListData);
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/ditto')
      .reply(200, pokemonDetailData);
    render(<QueryClientProvider client={new QueryClient()}><PokeClient/></QueryClientProvider>);
    const pokeclient = screen.getByTestId('pokeclient-page');
    expect(pokeclient).toBeInTheDocument();
    const pokedexList = screen.getByTestId('pokedexlist-component-list');
    await waitFor(() => {
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
    const pokeclient = screen.getByTestId('pokeclient-page');
    expect(pokeclient).toBeInTheDocument();
    const pokedexList = screen.getByTestId('pokedexlist-component-list');

    await waitFor(() => {
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
    const pokeclient = screen.getByTestId('pokeclient-page');
    expect(pokeclient).toBeInTheDocument();
    const pokedexList = screen.getByTestId('pokedexlist-component-list');
    await waitFor(() => {
      const ditto = pokedexList.querySelector('li:first-child div div')?.innerHTML;
      const nextButton = screen.getByTestId('pagination-next-button');
      expect(ditto).toBe('ditto');
      fireEvent.click(nextButton);
    });

    await waitFor(() => {
      const charmander = pokedexList.querySelector('li:first-child div div')?.innerHTML;
      const previousButton = screen.getByTestId('pagination-previous-button');
      expect(charmander).toBe('charmander');
      fireEvent.click(previousButton);
    });

    await waitFor(() => {
      const ditto = pokedexList.querySelector('li:first-child div div')?.innerHTML;
      expect(ditto).toBe('ditto');
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
    const pokeclient = screen.getByTestId('pokeclient-page');
    expect(pokeclient).toBeInTheDocument();
    const pokedexList = screen.getByTestId('pokedexlist-component-list');
    await waitFor(() => {
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
    const pokeclient = screen.getByTestId('pokeclient-page');
    expect(pokeclient).toBeInTheDocument();
    const pokedexList = screen.getByTestId('pokedexlist-component-list');
    await waitFor(() => {
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
    pokemonDetailData.name = 'meowth';
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/?limit=60&offset=0')
      .reply(200, pokemonListData);
    nock('https://pokeapi.co/api/v2')
      .get('/pokemon/pikachu')
      .reply(200, pokemonDetailData);
    render(<QueryClientProvider client={new QueryClient()}><PokeClient/></QueryClientProvider>);
    const pokeclient = screen.getByTestId('pokeclient-page');
    expect(pokeclient).toBeInTheDocument();
    const pokedexList = screen.getByTestId('pokedexlist-component-list');
    await waitFor(() => {
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
});