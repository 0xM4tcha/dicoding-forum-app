import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '@/utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  CREATE_THREAD: 'CREATE_THREAD',
  UPVOTE_THREADS: 'UPVOTE_THREADS',
  DOWNVOTE_THREADS: 'DOWNVOTE_THREADS',
  NEUTRALIZE_VOTE_THREADS: 'NEUTRALIZE_VOTE_THREADS',
  ERROR_AUTH: 'You must be logged in to vote.',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function createThreadActionCreator(thread) {
  return {
    type: ActionType.CREATE_THREAD,
    payload: {
      thread,
    },
  };
}

function upVoteThreadActionCreator({ vote }) {
  return {
    type: ActionType.UPVOTE_THREADS,
    payload: {
      vote,
    },
  };
}

function downVoteThreadActionCreator({ vote }) {
  return {
    type: ActionType.DOWNVOTE_THREADS,
    payload: {
      vote,
    },
  };
}

function neutralizeVoteThreadActionCreator({ vote }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREADS,
    payload: {
      vote,
    },
  };
}

function asyncCreateThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(createThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteThread({ threadId }) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (!authUser) {
      alert(ActionType.ERROR_AUTH);
      return;
    }
    const threadDetail = threads.find((thread) => thread.id === threadId);
    const hasUpVoted = threadDetail.upVotesBy.includes(authUser?.id);

    if (hasUpVoted) {
      return dispatch(asyncNeutralizeVoteThread({ threadId }));
    }

    dispatch(showLoading());

    try {
      const { vote } = await api.upVoteThread(threadId);
      dispatch(upVoteThreadActionCreator({ vote }));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteThread({ threadId }) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (!authUser) {
      alert(ActionType.ERROR_AUTH);
      return;
    }
    const threadDetail = threads.find((thread) => thread.id === threadId);
    const hasDownUpVoted = threadDetail.downVotesBy.includes(authUser.id);

    if (hasDownUpVoted) {
      return dispatch(asyncNeutralizeVoteThread({ threadId }));
    }

    dispatch(showLoading());

    try {
      const { vote } = await api.downVoteThread(threadId);
      dispatch(downVoteThreadActionCreator({ vote }));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteThread({ threadId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const { vote } = await api.neutralizeVote(threadId);
      dispatch(neutralizeVoteThreadActionCreator({ vote }));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  createThreadActionCreator,
  asyncCreateThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
};
