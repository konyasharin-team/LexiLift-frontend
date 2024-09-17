import { FC } from 'react';
import { FlipCard, useFlipCard } from '@components/FlipCard';

const App: FC = () => {
  const [value, toggle] = useFlipCard();

  return (
    <>
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
