import { PokeClient }from './screens/PokeClient'

export default function Home() {
  return (
    <div className='h-full'>
      <main className='flex grow min-h-full'>
        <PokeClient />
      </main>
    </div>
  );
}
