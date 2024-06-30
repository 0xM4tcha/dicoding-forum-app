/**
 * test scenario for threadDetailReducer
 *
 * - threadDetailReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the thread when given by RECEIVE_THREAD_DETAIL action
 *  - should return the thread with the new thread.comments when given by CREATE_COMMENT action
 *  - should return the thread with the new thread.upVotesBy and thread.upVotesBy when given by UPVOTE_THREAD_DETAIL
 *  - should return the thread with the new thread.upVotesBy and thread.downVotesBy when given by DOWNVOTE_THREAD_DETAIL
 *  - should return the thread with the filtered thread.upVotesBy and thread.downVotesBy when given by NEUTRALIZE_VOTE_THREAD_DETAIL
 *  - should return the thread with the new thread.comments[0].upVotesBy and thread.comments[0].downVotesBy when given by UPVOTE_COMMENT
 *  - should return the thread with the new thread.comments[0].upVotesBy and thread.comments[0].downVotesBy when given by DOWNVOTE_COMMENT
 *  - should return the thread with the filtered thread.comments[0].upVotesBy and thread.comments[0].downVotesBy when given by NEUTRALIZE_VOTE_COMMENT
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';

describe('threadDetailReducers function', () => {
  it('should return initial state when given by unknown action', () => {
    // arrange
    const initialState = {};
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {};
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        threadDetail: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [
            {
              id: 'comment-1',
              content: 'Ini adalah komentar pertama',
              createdAt: '2021-06-21T07:00:00.000Z',
              owner: {
                id: 'users-1',
                name: 'John Doe',
                avatar: 'https://generated-image-url.jpg',
              },
              upVotesBy: [],
              downVotesBy: [],
            },
          ],
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return the thread with the new thread.comments when given by CREATE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'CREATE_COMMENT',
      payload: {
        comment: {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
          },
        },
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment],
    });
  });

  it('should return the threads with the new thread.upVotesBy and thread.downVotesBy when given by UPVOTE_THREAD_DETAIL', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: ['users-1'],
      comments: [],
    };

    const action = {
      type: 'UPVOTE_THREAD_DETAIL',
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
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        upVotesBy: ['users-1'],
        downVotesBy: []
      }
    );
  });

  it('should return the threads with the new thread.upVotesBy and thread.downVotesBy when given by DOWNVOTE_THREAD_DETAIL', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['users-1'],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'DOWNVOTE_THREAD_DETAIL',
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
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        upVotesBy: [],
        downVotesBy: ['users-1']
      }
    );
  });

  it('should return the threads with the new thread.upVotesBy and thread.downVotesBy when given by NEUTRALIZE_VOTE_THREAD_DETAIL', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['users-1'],
      downVotesBy: ['users-2'],
      comments: [],
    };

    // netralize upvote
    const action = {
      type: 'NEUTRALIZE_VOTE_THREAD_DETAIL',
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
      type: 'NEUTRALIZE_VOTE_THREAD_DETAIL',
      payload: {
        vote: {
          id: "vote-2",
          userId: "users-2",
          threadId: "thread-1",
          voteType: 1
        }
      },
    };

    // action
    const nextState_netral_up_vote = threadDetailReducer(initialState, action);
    const nextState_netral_down_vote = threadDetailReducer(initialState, action2);

    // assert
    // netralize upvote
    expect(nextState_netral_up_vote).toEqual(
      {
        ...initialState,
        upVotesBy: []
      }
    );

    // netralize downvote
    expect(nextState_netral_down_vote).toEqual(
      {
        ...initialState,
        downVotesBy: []
      }
    );
  });

  it('should return the thread with the new thread.comments[0].upVotesBy and thread.comments[0].downVotesBy when given by UPVOTE_COMMENT', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['users-1'],
      downVotesBy: ['users-2'],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: ['users-1'],
        },
      ],
    };

    const action = {
      type: 'UPVOTE_COMMENT',
      payload: {
        vote: {
          id: "vote-1",
          userId: "users-1",
          commentId: "comment-1",
          voteType: 1
        }
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        comments: [
          {
            ...initialState.comments[0],
            upVotesBy: ['users-1'],
            downVotesBy: []
          }
        ]
      }
    );

  })

  it('should return the thread with the new thread.comments[0].upVotesBy and thread.comments[0].downVotesBy when given by DOWNVOTE_COMMENT', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['users-1'],
      downVotesBy: ['users-2'],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: ['users-1'],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: 'DOWNVOTE_COMMENT',
      payload: {
        vote: {
          id: "vote-1",
          userId: "users-1",
          commentId: "comment-1",
          voteType: 1
        }
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        comments: [
          {
            ...initialState.comments[0],
            upVotesBy: [],
            downVotesBy: ['users-1']
          }
        ]
      }
    );

  })

  it('should return the thread with the filtered thread.comments[0].upVotesBy and thread.comments[0].downVotesBy when given by NEUTRALIZE_VOTE_COMMENT', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: 'NEUTRALIZE_VOTE_COMMENT',
      payload: {
        vote: {
          id: "vote-1",
          userId: "users-1",
          commentId: "comment-1",
          voteType: 0
        }
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(
      {
        ...initialState,
        comments: [
          {
            ...initialState.comments[0],
            upVotesBy: []
          }
        ]
      }
    );
  })

});
