import { PokemonBasicInfo } from "./PokemonBasicInfo";
import { pokemonBasicStatsType } from "@/app/types/pokemonSearchTypes";
import { pokemonDetailData } from '@/testData/pokemonMockData'
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'

describe('#PokemonBasicInfo', () => {
  const mockData: pokemonBasicStatsType = pokemonDetailData;

  it('renders Pokemon basic info', () => {
    render(<PokemonBasicInfo basicInfo={mockData} />);
    expect(screen.getByTestId('basicInfo-section')).toBeInTheDocument();
  });

  it('should render the correct image', () => {
    render(<PokemonBasicInfo basicInfo={mockData} />);
    const pokemonImage = screen.getByTestId('basicInfo-section-image');
    expect(pokemonImage).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png');
    expect(pokemonImage).toHaveAttribute('alt', 'Pokemon test Sprite');
  });

  it('should render 1 type', () => {
    render(<PokemonBasicInfo basicInfo={mockData} />);
    const statsList = screen.getByTestId('type-section-list');
    const statsListItems = statsList.querySelectorAll('li');
    expect(statsList).toBeInTheDocument();
    expect(statsListItems.length).toBe(1);
    expect(statsListItems[0].innerHTML).toBe('Type: test type');
  });

  it('should render number correctly', () => {
    render(<PokemonBasicInfo basicInfo={mockData} />);
    const pokemonNumber = screen.getByTestId('basicInfo-section-id').innerHTML;
    expect(pokemonNumber).toBe('Number: 12345');
  });

  it('should render name correctly', () => {
    render(<PokemonBasicInfo basicInfo={mockData} />);
    const pokemonName = screen.getByTestId('basicInfo-section-name').innerHTML;
    expect(pokemonName).toBe('Name: Pokemon test');
  });

  it('should render height correctly', () => {
    render(<PokemonBasicInfo basicInfo={mockData} />);
    const pokemonHeight = screen.getByTestId('basicInfo-section-height').innerHTML;
    expect(pokemonHeight).toBe('Height: 100');
  });

  it('should render weight correctly', () => {
    render(<PokemonBasicInfo basicInfo={mockData} />);
    const pokemonWeight = screen.getByTestId('basicInfo-section-weight').innerHTML;
    expect(pokemonWeight).toBe('Weight: 20');
  });
});