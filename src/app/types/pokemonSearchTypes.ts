export type pokemonBasicStatsType = {
  id: number,
  order: number,
  name: string,
  height: number,
  weight: number,
  sprites: {
    front_default: string
  },
  types: pokemonTypesType[],
  stats: pokemonStatsType[],
  abilities: pokemonAbilitiesType[],
  moves: pokemonMovesType[]
}

export type pokemonTypesType = {
  type: {
    name: string;
  }
};

export type pokemonStatsType = {
  base_stat: number,
  stat: {
    name: string
  }
};

export type pokemonAbilitiesType = {
  ability: {
    name: string
  }
}

export type pokemonMovesType = {
  move: {
    name: string
  }
}

export type pokemonPageDataType = {
  next: string | null;
  previous: string | null;
  results: pokemonListType;
}

export type pokemonListType = pokemonListItemType[];

export type pokemonListItemType = {
  url: string,
  name: string
}
