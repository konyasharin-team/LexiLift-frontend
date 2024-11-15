import { FC } from 'react';
import { Link } from 'react-router-dom';
import testImg from '@assets/images/test-img.jpg';
import { FlipCard, useFlipCard } from '@components/FlipCard';
import { Text } from '@mantine/core';
import { appPaths } from '@routes';

export const TestPage: FC = () => {
  const [value, toggle] = useFlipCard();

  return (
    <>
      <FlipCard
        word={'red'}
        translation={'красный'}
        translationImg={testImg}
        activeSide={value}
        onClick={() => toggle()}
        style={{ marginLeft: '10px', marginTop: '10px' }}
      />
      <Link to={appPaths.MATCH_TEST_SETTINGS}>
        <Text fz={36} fw={500}>
          К приватным роутам -{'>'}
        </Text>
      </Link>
    </>
  );
};
