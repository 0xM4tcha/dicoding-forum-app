import { describe, it, expect } from "vitest";
import threadsReducer from './reducer';

describe('threadReducers function', () => { 
  it('should return initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  })
 })

/**
* test scenario for threadsReducer
*
* - threadsReducer function
*  - should return the initial state when given by unknown action
*  - should return the talks when given by RECEIVE_THREADS action
*  - should return the talks with the new talk when given by ADD_THREAD action
*
*/