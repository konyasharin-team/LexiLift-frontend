import { ITestResults } from '@modules/sharedTest';

export type MatchTestResults = Pick<ITestResults, 'time' | 'statistics'>;
