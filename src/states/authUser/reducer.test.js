/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *  - should return the initial state when given by unknown action
 *  - should return authUser when given by SET_AUTH_USER action
 *  - should return null when given by UNSET_AUTH_USER action
 */
import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';

describe('authUserReducers function', () => {
  it('should return initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the authUser when given by SET_AUTH_USER action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'SET_AUTH_USER',
      payload: {
        authUser: {
          id: "john_doe",
          name: "John Doe",
          email: "john@example.com",
          avatar: "https://generated-image-url.jpg"
        }
      },
    };
    // action
    const nextState = authUserReducer(initialState, action);
    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  it('should return null when given by UNSET_AUTH_USER action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'UNSET_AUTH_USER',
      payload: {
        authUser: null
      },
    };
    // action
    const nextState = authUserReducer(initialState, action);
    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });
});
