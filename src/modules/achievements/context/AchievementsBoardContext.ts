import { createContext } from 'react';

interface IAchievementBoardContext {
  boardHeight: number;
}

export const AchievementsBoardContext = createContext<IAchievementBoardContext>(
  {
    boardHeight: 0,
  },
);
