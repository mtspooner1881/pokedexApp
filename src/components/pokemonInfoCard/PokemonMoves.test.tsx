import { PokemonMoves } from "./PokemonMoves";
import { pokemonMovesType } from "@/app/types/pokemonSearchTypes";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'

describe('#PokemonMoves', () => {
    const mockData: pokemonMovesType[] = [
    {
      move: {
        name: 'acid'
      }
    },
    {
      move: {
        name: 'bite'
      }
    },
    {
      move: {
        name: 'flash'
      }
    }
  ];

  it('renders Pokemon moves', () => {
    render(<PokemonMoves movesInfo={mockData} />);
    expect(screen.getByTestId('moves-section')).toBeInTheDocument();
  });

  it('should render 3 moves', () => {
    render(<PokemonMoves movesInfo={mockData} />);
    const movesList = screen.getByTestId('moves-section-list');
    const movesListItems = movesList.querySelectorAll('li');
    expect(movesList).toBeInTheDocument();
    expect(movesListItems.length).toBe(3);
  });

  it('should have moves rendered correctly', () => {
    render(<PokemonMoves movesInfo={mockData} />);
    const movesList = screen.getByTestId('moves-section-list');
    const movesListItems = movesList.querySelectorAll('li');

    expect(movesListItems[0].innerHTML).toBe('acid');
    expect(movesListItems[1].innerHTML).toBe('bite');
    expect(movesListItems[2].innerHTML).toBe('flash');
  });

  it('should render nothing if moves are absent', () => {
    render(<PokemonMoves movesInfo={[]} />);
    const movesList = screen.getByTestId('moves-section-list');
    const movesListItems = movesList.querySelectorAll('li');
    expect(movesList).toBeInTheDocument();
    expect(movesListItems.length).toBe(0);
  });
});