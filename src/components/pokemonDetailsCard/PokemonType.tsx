import React from 'react';
import { pokemonTypesType } from '@/app/types/pokemonSearchTypes';

interface pokemonTypeInterface {
  typeInfo: pokemonTypesType[]
}

export function PokemonType({
  typeInfo
}: pokemonTypeInterface): React.JSX.Element {
  const typeList: React.JSX.Element[] = typeInfo.map((type, index) => {
    const typeName = type.type.name;
    return <li key={`${typeName}-${index}`}>Type: {typeName}</li>
  });
  return (
    <ul data-testid='type-section-list' className='flex-1 content-center' >
      {typeList}
    </ul>
  );
}