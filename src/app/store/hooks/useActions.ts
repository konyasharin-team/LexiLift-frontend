import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { actions } from '../actions.ts';

export const useActions = () => bindActionCreators(actions, useDispatch());
