import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

function CommentList({ comments, authUser, upVote, downVote }) {
  const hasUpVoted = (comment) => comment.upVotesBy.includes(authUser?.id);

  const hasDownVoted = (comment) => comment.downVotesBy.includes(authUser?.id);

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          upVote={() => upVote(comment.id)}
          downVote={() => downVote(comment.id)}
          hasUpVoted={hasUpVoted(comment)}
          hasDownVoted={hasDownVoted(comment)}
        />
      ))}
    </div>
  );
}

const authUserShape = {
  avatar: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const OwnerShape = {
  avatar: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const CommentShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.shape(OwnerShape).isRequired,
});

CommentList.propTypes = {
  comments: PropTypes.arrayOf(CommentShape).isRequired,
  authUser: PropTypes.shape(authUserShape).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default CommentList;
