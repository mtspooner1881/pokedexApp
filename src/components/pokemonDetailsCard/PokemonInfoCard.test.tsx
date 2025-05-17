import { PokemonInfoCard } from './PokemonInfoCard';
import { pokemonDetailData } from '@/testData/pokemonMockData';
import { pokemonBasicStatsType } from '@/app/types/pokemonSearchTypes';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'

const mockData: pokemonBasicStatsType = pokemonDetailData;


describe('#PokemonInfoCard', () => {
  it('renders the info card', () => {
    render(<PokemonInfoCard pokemonStats={mockData} />);
    const infoCardConatainer = screen.getByTestId('infoCard-section');
    expect(infoCardConatainer).toBeInTheDocument();
  }); 

  it('renders basic info module', () => {
    render(<PokemonInfoCard pokemonStats={mockData} />);
    const infoCardConatainer = screen.getByTestId('basicInfo-section');
    expect(infoCardConatainer).toBeInTheDocument();
  });

  it('renders abilities module', () => {
    render(<PokemonInfoCard pokemonStats={mockData} />);
    const infoCardConatainer = screen.getByTestId('abilities-section');
    expect(infoCardConatainer).toBeInTheDocument();
  });

  it('renders stats module', () => {
    render(<PokemonInfoCard pokemonStats={mockData} />);
    const infoCardConatainer = screen.getByTestId('stats-section');
    expect(infoCardConatainer).toBeInTheDocument();
  });
  
  it('renders moves info module', () => {
    render(<PokemonInfoCard pokemonStats={mockData} />);
    const infoCardConatainer = screen.getByTestId('moves-section');
    expect(infoCardConatainer).toBeInTheDocument();
  });
});