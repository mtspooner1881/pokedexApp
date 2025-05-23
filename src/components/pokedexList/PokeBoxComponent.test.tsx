import { render, screen, fireEvent } from "@testing-library/react";
import { pokemonListData } from "@/testData/pokemonMockData";
import '@testing-library/jest-dom';
import { PokeBoxComponent } from "./PokeBoxComponent";

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  }),
  usePathname: () => '/'
}));

describe('#PokeBoxComponent', () => {
  it('should render correctly', () => {
    render(<PokeBoxComponent pokemon={pokemonListData.results[0]} getSelectedPokemon={jest.fn()} />);
    expect(screen.getByTestId('pokeBox-component')).toBeInTheDocument();
  });

    it('should trigger when the button is clicked', () => {
    const onClick = jest.fn();
    render(<PokeBoxComponent pokemon={pokemonListData.results[0]} getSelectedPokemon={onClick} />);
    const pokemonButton = screen.getByTestId('pokeBox-button-component');
    fireEvent.click(pokemonButton);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/ditto');
  });
});