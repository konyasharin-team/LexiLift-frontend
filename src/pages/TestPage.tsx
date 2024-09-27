import { FC } from 'react';
import AppLayout from '@components/AppLayout/AppLayout.tsx';
import { FlipCard, useFlipCard } from '@components/FlipCard';
import testImg from '@assets/images/test-img.jpg';

export const TestPage: FC = () => {
  const [value, toggle] = useFlipCard();

  return (
    <AppLayout>
      <FlipCard
        word={'red'}
        translation={'красный'}
        translationImg={testImg}
        activeSide={value}
        onClick={() => toggle()}
        style={{ marginLeft: '10px', marginTop: '10px' }}
      />
    </AppLayout>
  )
};
