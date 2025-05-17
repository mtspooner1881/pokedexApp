import { PokemonType } from "./PokemonType";
import { pokemonTypesType } from "@/app/types/pokemonSearchTypes";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'

describe('#PokemonType', () => {
    const mockData: pokemonTypesType[] = [
    {
      type: {
        name: 'electric'
      }
    },
    {
      type: {
        name: 'psychic'
      }
    }
  ];

  it('renders Pokemon types', () => {
    render(<PokemonType typeInfo={mockData} />);
    expect(screen.getByTestId('type-section-list')).toBeInTheDocument();
  });

  it('should render 2 types', () => {
    render(<PokemonType typeInfo={mockData} />);
    const statsList = screen.getByTestId('type-section-list');
    const statsListItems = statsList.querySelectorAll('li');
    expect(statsList).toBeInTheDocument();
    expect(statsListItems.length).toBe(2);
  });

  it('should have stats rendered correctly', () => {
    render(<PokemonType typeInfo={mockData} />);
    const statsList = screen.getByTestId('type-section-list');
    const statsListItems = statsList.querySelectorAll('li');

    expect(statsListItems[0].innerHTML).toBe('Type: electric');
    expect(statsListItems[1].innerHTML).toBe('Type: psychic');
  });

  it('should render nothing if stats are absent', () => {
    render(<PokemonType typeInfo={[]} />);
    const statsList = screen.getByTestId('type-section-list');
    const statsListItems = statsList.querySelectorAll('li');
    expect(statsList).toBeInTheDocument();
    expect(statsListItems.length).toBe(0);
  });
});