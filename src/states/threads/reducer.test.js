/**
 * test scenario for threadsReducer
 *
 * - threadsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_THREADS action
 *  - should return the threads with the new thread when given by CREATE_THREAD action
 *  - should return the threads with the new thread.upVotesBy and thread.upVotesBy when given by UPVOTE_THREADS
 *  - should return the threads with the new thread.upVotesBy and thread.downVotesBy when given by DOWNVOTE_THREADS
 *  - should return the threads with the filtered thread.upVotesBy and thread.downVotesBy when given by NETRALIZE_THREADS
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';

describe('threadsReducers function', () => {
  it('should return initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given by CREATE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: 'CREATE_THREAD',
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };
    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return the threads with the new thread.upVotesBy and thread.downVotesBy when given by UPVOTE_THREADS', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: ['users-1'],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: 'UPVOTE_THREADS',
      payload: {
        vote: {
          id: "vote-1",
          userId: "users-1",
          threadId: "thread-1",
          voteType: 1
        }
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: ['users-1'],
        downVotesBy: []
      },
      {...initialState[1]}
    ]);
  });

  it('should return the threads with the new thread.upVotesBy and thread.downVotesBy when given by DOWNVOTE_THREADS', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-1'],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: 'DOWNVOTE_THREADS',
      payload: {
        vote: {
          id: "vote-1",
          userId: "users-1",
          threadId: "thread-1",
          voteType: 1
        }
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: ['users-1']
      },
      {...initialState[1]}
    ]);
  });

  it('should return the threads with the new thread.upVotesBy and thread.downVotesBy when given by NEUTRALIZE_VOTE_THREADS', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-1'],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: ['users-1'],
        totalComments: 0,
      },
    ];

    // netralize upvote
    const action = {
      type: 'NEUTRALIZE_VOTE_THREADS',
      payload: {
        vote: {
          id: "vote-1",
          userId: "users-1",
          threadId: "thread-1",
          voteType: 1
        }
      },
    };
    // netralize downvote
    const action2 = {
      type: 'NEUTRALIZE_VOTE_THREADS',
      payload: {
        vote: {
          id: "vote-1",
          userId: "users-1",
          threadId: "thread-2",
          voteType: 1
        }
      },
    };

    // action
    const nextState_netral_up_vote = threadsReducer(initialState, action);
    const nextState_netral_down_vote = threadsReducer(initialState, action2);

    // assert
    // netralize upvote
    expect(nextState_netral_up_vote).toEqual([
      {
        ...initialState[0],
        upVotesBy: []
      },
      {...initialState[1]}
    ]);

    // netralize downvote
    expect(nextState_netral_down_vote).toEqual([
      {...initialState[0]},
      {
        ...initialState[1],
        downVotesBy: []
      }
    ]);
  });


});
