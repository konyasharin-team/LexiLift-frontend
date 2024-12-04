import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem } from '@components/List';
import { Button, Text } from '@mantine/core';
import { appPaths } from '@routes';

export const TestPage: FC = () => {
  const [test, setTest] = useState([
    { content: '123', key: 0 },
    { content: '123', key: 1 },
    { content: '1234', key: 2 },
    { content: '1235', key: 3 },
    { content: '1236', key: 4 },
    { content: '123', key: 5 },
    { content: '1234', key: 6 },
    { content: '1235', key: 7 },
    { content: '1236', key: 8 },
    { content: '123', key: 9 },
    { content: '1234', key: 10 },
    { content: '1235', key: 11 },
    { content: '1236', key: 12 },
  ]);

  const getElements = () => {
    return test.map(elem => (
      <ListItem key={elem.key} index={elem.key}>
        {elem.content}
      </ListItem>
    ));
  };

  return (
    <>
      <Link to={appPaths.MATCH_TEST_SETTINGS}>
        <Text fz={36} fw={500}>
          К приватным роутам -{'>'}
        </Text>
      </Link>
      <List height={250} span={4}>
        {getElements()}
      </List>
      <Button onClick={() => setTest(test.filter(elem => elem.key !== 2))}>
        test
      </Button>
    </>
  );
};
