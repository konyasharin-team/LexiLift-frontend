import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import testImg from '@assets/images/test-img.jpg';
import { FlipCard, useFlipCard } from '@components/FlipCard';
import { List, ListItem } from '@components/List';
import { Button, Text } from '@mantine/core';
import { appPaths } from '@routes';

export const TestPage: FC = () => {
  const [value, toggle] = useFlipCard();
  const [test, setTest] = useState([
    { content: '123', key: 1 },
    { content: '1234', key: 2 },
    { content: '1235', key: 3 },
    { content: '1236', key: 4 },
  ]);

  const getElements = () => {
    return test.map(elem => <ListItem key={elem.key}>{elem.content}</ListItem>);
  };

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
      <List>{getElements()}</List>
      <Button onClick={() => setTest(test.filter(elem => elem.key !== 2))}>
        test
      </Button>
    </>
  );
};
