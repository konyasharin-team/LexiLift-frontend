import { FC } from 'react';
import AppLayout from '@components/AppLayout/AppLayout.tsx';
import { FlipCard, useFlipCard } from '@components/FlipCard';

const App: FC = () => {
  const [value, toggle] = useFlipCard();

  return (
    <>
      <AppLayout />
      <FlipCard
        word={'back'}
        translation={'translate'}
        activeSide={value}
        onClick={() => toggle()}
      />
    </>
  );
};

export default App;
