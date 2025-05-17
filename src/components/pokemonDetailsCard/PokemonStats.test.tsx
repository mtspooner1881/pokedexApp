import { PokemonStats } from "./PokemonStats";
import { pokemonStatsType } from "@/app/types/pokemonSearchTypes";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'

describe('#PokemonStats', () => {
    const mockData: pokemonStatsType[] = [
    {
      base_stat: 100,
      stat: {
        name: 'HP'
      }
    },
    {
      base_stat: 50,
      stat: {
        name: 'strength'
      }
    },
    {
      base_stat: 30,
      stat: {
        name: 'speed'
      }
    }
  ];

  it('renders Pokemon stats', () => {
    render(<PokemonStats statsInfo={mockData} />);
    expect(screen.getByTestId('stats-section')).toBeInTheDocument();
  });

  it('should render 3 stats', () => {
    render(<PokemonStats statsInfo={mockData} />);
    const statsList = screen.getByTestId('stats-section-list');
    const statsListItems = statsList.querySelectorAll('li');
    expect(statsList).toBeInTheDocument();
    expect(statsListItems.length).toBe(3);
  });

  it('should have stats rendered correctly', () => {
    render(<PokemonStats statsInfo={mockData} />);
    const statsList = screen.getByTestId('stats-section-list');
    const statsListItems = statsList.querySelectorAll('li');

    expect(statsListItems[0].innerHTML).toBe('HP: 100');
    expect(statsListItems[1].innerHTML).toBe('strength: 50');
    expect(statsListItems[2].innerHTML).toBe('speed: 30');
  });

  it('should render nothing if stats are absent', () => {
    render(<PokemonStats statsInfo={[]} />);
    const statsList = screen.getByTestId('stats-section-list');
    const statsListItems = statsList.querySelectorAll('li');
    expect(statsList).toBeInTheDocument();
    expect(statsListItems.length).toBe(0);
  });
});