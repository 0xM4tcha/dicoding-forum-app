import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  const clearUpVote = (thread) =>
    thread.upVotesBy.includes(action.payload.vote.userId)
      ? thread.upVotesBy.filter((id) => id !== action.payload.vote.userId)
      : thread.upVotesBy;

  const clearDownVote = (thread) =>
    thread.downVotesBy.includes(action.payload.vote.userId)
      ? thread.downVotesBy.filter((id) => id !== action.payload.vote.userId)
      : thread.downVotesBy;

  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.CREATE_THREAD:
      return action.payload.thread
        ? [action.payload.thread, ...threads]
        : threads;
    case ActionType.UPVOTE_THREADS:
      return threads.map((thread) => {
        if (thread.id === action.payload.vote.threadId) {
          return {
            ...thread,
            upVotesBy: [...thread.upVotesBy, action.payload.vote.userId],
            downVotesBy: clearDownVote(thread),
          };
        }
        return thread;
      });
    case ActionType.DOWNVOTE_THREADS:
      return threads.map((thread) => {
        if (thread.id === action.payload.vote.threadId) {
          return {
            ...thread,
            upVotesBy: clearUpVote(thread),
            downVotesBy: [...thread.downVotesBy, action.payload.vote.userId],
          };
        }
        return thread;
      });
    case ActionType.NEUTRALIZE_VOTE_THREADS:
      return threads.map((thread) => {
        if (thread.id === action.payload.vote.threadId) {
          return {
            ...thread,
            upVotesBy: clearUpVote(thread),
            downVotesBy: clearDownVote(thread),
          };
        }
        return thread;
      });
    default:
      return threads;
  }
}

export default threadsReducer;
