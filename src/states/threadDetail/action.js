import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '@/utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CREATE_COMMENT: 'CREATE_COMMENT',
  UPVOTE_THREAD_DETAIL: 'UPVOTE_THREAD_DETAIL',
  DOWNVOTE_THREAD_DETAIL: 'DOWNVOTE_THREAD_DETAIL',
  NEUTRALIZE_VOTE_THREAD_DETAIL: 'NEUTRALIZE_VOTE_THREAD_DETAIL',
  UPVOTE_COMMENT: 'UPVOTE_COMMENT',
  DOWNVOTE_COMMENT: 'DOWNVOTE_COMMENT',
  NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMEN',
  ERROR_AUTH: 'You must be logged in to vote.',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function createCommentActionCreator(comment) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteThreadDetailActionCreator({ vote }) {
  return {
    type: ActionType.UPVOTE_THREAD_DETAIL,
    payload: {
      vote,
    },
  };
}

function downVoteThreadDetailActionCreator({ vote }) {
  return {
    type: ActionType.DOWNVOTE_THREAD_DETAIL,
    payload: {
      vote,
    },
  };
}

function neutralizeVoteThreadActionCreator({ vote }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
    payload: {
      vote,
    },
  };
}

function upVoteCommentActionCreator({ vote }) {
  return {
    type: ActionType.UPVOTE_COMMENT,
    payload: {
      vote,
    },
  };
}

function downVoteCommentActionCreator({ vote }) {
  return {
    type: ActionType.DOWNVOTE_COMMENT,
    payload: {
      vote,
    },
  };
}

function neutralizeCommentActionCreator({ vote }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_COMMENT,
    payload: {
      vote,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncCreateComment({ id, content }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment({ id, content });
      dispatch(createCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteThread({ threadId }) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert(ActionType.ERROR_AUTH);
      return;
    }
    const hasUpVoted = threadDetail.upVotesBy.includes(authUser.id);

    if (hasUpVoted) {
      return dispatch(asyncNeutralizeVoteThread({ threadId }));
    }

    dispatch(showLoading());

    try {
      const { vote } = await api.upVoteThread(threadId);
      dispatch(upVoteThreadDetailActionCreator({ vote }));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteThread({ threadId }) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert(ActionType.ERROR_AUTH);
      return;
    }
    const hasDownUpVoted = threadDetail.downVotesBy.includes(authUser.id);
    if (hasDownUpVoted) {
      return dispatch(asyncNeutralizeVoteThread({ threadId }));
    }
    dispatch(showLoading());

    try {
      const { vote } = await api.downVoteThread(threadId);
      dispatch(downVoteThreadDetailActionCreator({ vote }));
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

function asyncUpVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert(ActionType.ERROR_AUTH);
      return;
    }
    const hasUpVoted = threadDetail.comments.some((comment) =>
      comment.upVotesBy.includes(authUser.id)
    );

    if (hasUpVoted) {
      return dispatch(asyncNeutralizeVoteComment({ threadId, commentId }));
    }

    dispatch(showLoading());

    try {
      const { vote } = await api.upVoteComment({ threadId, commentId });
      dispatch(upVoteCommentActionCreator({ vote }));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert(ActionType.ERROR_AUTH);
      return;
    }
    const hasDownVoted = threadDetail.comments.some((comment) =>
      comment.downVotesBy.includes(authUser.id)
    );

    if (hasDownVoted) {
      return dispatch(asyncNeutralizeVoteComment({ threadId, commentId }));
    }

    dispatch(showLoading());

    try {
      const { vote } = await api.downVoteComment({ threadId, commentId });
      dispatch(downVoteCommentActionCreator({ vote }));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteComment({ threadId, commentId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const { vote } = await api.neutralizeVoteComment({ threadId, commentId });
      dispatch(neutralizeCommentActionCreator({ vote }));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncCreateComment,
  createCommentActionCreator,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
};
