import React from 'react';
import { PokeClient }from './screens/PokeClient'

export default function Home(): React.JSX.Element {
  return (
    <div className='h-full'>
      <main className='flex grow min-h-full'>
        <PokeClient />
      </main>
    </div>
  );
}
