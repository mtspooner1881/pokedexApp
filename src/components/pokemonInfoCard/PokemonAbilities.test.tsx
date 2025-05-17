import { PokemonAbilities } from "./PokemonAbilities";
import { pokemonAbilitiesType } from "@/app/types/pokemonSearchTypes";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('#PokemonAbilities', () => {
    const mockData: pokemonAbilitiesType[] = [
    {
      ability: {
        name: 'battle armor'
      }
    },
    {
      ability: {
        name: 'fluffy'
      }
    },
    {
      ability: {
        name: 'static'
      }
    }
  ];

  it('renders Pokemon abilities', () => {
    render(<PokemonAbilities abilitiesInfo={mockData} />);
    expect(screen.getByTestId('abilities-section')).toBeInTheDocument();
  });

  it('should render 3 abilities', () => {
    render(<PokemonAbilities abilitiesInfo={mockData} />);
    const abilitiesList = screen.getByTestId('abilities-section-list');
    const abilitiesListItems = abilitiesList.querySelectorAll('li');
    expect(abilitiesList).toBeInTheDocument();
    expect(abilitiesListItems.length).toBe(3);
  });

  it('should have abilities rendered correctly', () => {
    render(<PokemonAbilities abilitiesInfo={mockData} />);
    const abilitiesList = screen.getByTestId('abilities-section-list');
    const abilitiesListItems = abilitiesList.querySelectorAll('li');

    expect(abilitiesListItems[0].innerHTML).toBe('battle armor');
    expect(abilitiesListItems[1].innerHTML).toBe('fluffy');
    expect(abilitiesListItems[2].innerHTML).toBe('static');
  });

  it('should render nothing if abilites are absent', () => {
    render(<PokemonAbilities abilitiesInfo={[]} />);
    const abilitiesList = screen.getByTestId('abilities-section-list');
    const abilitiesListItems = abilitiesList.querySelectorAll('li');
    expect(abilitiesList).toBeInTheDocument();
    expect(abilitiesListItems.length).toBe(0);
  });
});