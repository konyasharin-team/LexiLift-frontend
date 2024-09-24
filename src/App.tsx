import { FC } from 'react';

import AppLayout from '@components/AppLayout/AppLayout.tsx';

import testImg from '@assets/images/test-img.jpg';

import { FlipCard, useFlipCard } from '@components/FlipCard';

const App: FC = () => {
  const [value, toggle] = useFlipCard();

  return (
    <>
      <AppLayout />
      <FlipCard
        word={'red'}
        translation={'красный'}
        translationImg={testImg}
        activeSide={value}
        onClick={() => toggle()}
        style={{ marginLeft: '10px', marginTop: '10px' }}
      />
    </>
  );
};

export default App;
