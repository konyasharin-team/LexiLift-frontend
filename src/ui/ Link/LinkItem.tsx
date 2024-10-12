import { Link } from 'react-router-dom';
import { Flex, Text } from '@mantine/core';

import styles from './LinkItem.module.css'; // Импортируем CSS-модуль

interface ILinkProps {
  to: string;
  label: string;
}

export function LinkItem({ to, label }: ILinkProps) {
  return (
    <Flex justify="center">
      <Text mt="md">
        <Link to={to} className={styles.link}>
          {label}
        </Link>
      </Text>
    </Flex>
  );
}
