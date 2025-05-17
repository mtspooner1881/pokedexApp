import { pokemonBasicStatsType } from "@/app/types/pokemonSearchTypes";

export const pokemonDetailData: pokemonBasicStatsType = {
  id: 12345,
  order: 123,
  name: 'Pokemon test',
  height: 100,
  weight: 20,
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
  },
  types: [
    {
      type: {
        name: 'test type'
      }
    }
  ],
  stats: [
    {
      base_stat: 100,
      stat: {
        name: 'HP'
      }
    },
    {
      base_stat: 10,
      stat: {
        name: 'speed'
      }
    },
    {
      base_stat: 40,
      stat: {
        name: 'strength'
      }
    }
  ],
  abilities: [
    {
      ability: {
        name: 'Test ability 1'
      }
    },
    {
      ability: {
        name: 'Test ability 2'
      }
    },
    {
      ability: {
        name: 'Test ability 3'
      }
    }
  ],
  moves: [
    {
      move: {
        name: 'Move 1'
      }
    },
    {
      move: {
        name: 'Move 2'
      }
    },
    {
      move: {
        name: 'Move 3'
      }
    }
  ],
};

export const pokemonListData = {
    next: 'https://pokeapi.co/api/v2/pokemon/?limit=60&offset=1',
    previous: null,
    results: [
    {
      url: 'https://pokeapi.co/api/v2/pokemon/ditto',
      name: 'ditto'
    },
    {
      url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
      name: 'pikachu'
    },
    {
      url: 'https://pokeapi.co/api/v2/pokemon/eevee',
      name: 'eevee'
    }
  ]
}

export const pokemonListDataNewPage = {
    next: null,
    previous: 'https://pokeapi.co/api/v2/pokemon/?limit=60&offset=0',
    results: [
    {
      url: 'https://pokeapi.co/api/v2/pokemon/charmander',
      name: 'charmander'
    },
    {
      url: 'https://pokeapi.co/api/v2/pokemon/charizard',
      name: 'charizard'
    },
    {
      url: 'https://pokeapi.co/api/v2/pokemon/psyduck',
      name: 'psyduck'
    }
  ]
}