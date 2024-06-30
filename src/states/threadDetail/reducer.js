import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  const clearUpVote = (detail) =>
    detail.upVotesBy.includes(action.payload.vote.userId)
      ? detail.upVotesBy.filter(
          (userId) => userId !== action.payload.vote.userId
        )
      : detail.upVotesBy;

  const clearDownVote = (detail) =>
    detail.downVotesBy.includes(action.payload.vote.userId)
      ? detail.downVotesBy.filter(
          (userId) => userId !== action.payload.vote.userId
        )
      : detail.downVotesBy;

  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CREATE_COMMENT:
      return {
        ...threadDetail,
        comments: [action.payload.comment, ...threadDetail.comments],
      };
    case ActionType.UPVOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: [action.payload.vote.userId, ...threadDetail.upVotesBy],
        downVotesBy: clearDownVote(threadDetail),
      };
    case ActionType.DOWNVOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        downVotesBy: [action.payload.vote.userId, ...threadDetail.downVotesBy],
        upVotesBy: clearUpVote(threadDetail),
      };
    case ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: clearUpVote(threadDetail),
        downVotesBy: clearDownVote(threadDetail),
      };
    case ActionType.UPVOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.vote.commentId) {
            return {
              ...comment,
              upVotesBy: [...comment.upVotesBy, action.payload.vote.userId],
              downVotesBy: clearDownVote(comment),
            };
          }
          return comment;
        }),
      };
    case ActionType.DOWNVOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.vote.commentId) {
            return {
              ...comment,
              upVotesBy: clearUpVote(comment),
              downVotesBy: [...comment.downVotesBy, action.payload.vote.userId],
            };
          }
          return comment;
        }),
      };
    case ActionType.NEUTRALIZE_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.vote.commentId) {
            return {
              ...comment,
              upVotesBy: clearUpVote(comment),
              downVotesBy: clearDownVote(comment),
            };
          }
          return comment;
        }),
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
