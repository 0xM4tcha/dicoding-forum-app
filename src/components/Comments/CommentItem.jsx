import React from 'react';
import PropTypes from 'prop-types';
import { postedAt } from '@/utils';
import UpVoteButton from '@/components/Buttons/UpVoteButton';
import DownVoteButton from '@/components/Buttons/DownVoteButton';

function CommentItem({ comment, upVote, downVote, hasUpVoted, hasDownVoted }) {
  const { createdAt, content, upVotesBy, downVotesBy, owner } = comment;
  return (
    <div className="comment-item">
      <header className="comment-item__header">
        <div className="comment-item__owner-info">
          <img src={owner.avatar} alt="avatar comment" />
          <p>{owner.name}</p>
        </div>
        <p className="posted-at">{postedAt(createdAt)}</p>
      </header>
      <div
        className="thread-content__body"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <footer>
        <UpVoteButton
          totalVote={upVotesBy.length}
          hasVoted={hasUpVoted}
          onClick={upVote}
        />
        <DownVoteButton
          totalVote={downVotesBy.length}
          hasVoted={hasDownVoted}
          onClick={downVote}
        />
      </footer>
    </div>
  );
}

const OwnerShape = {
  avatar: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const CommentShape = {
  id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.shape(OwnerShape).isRequired,
};

CommentItem.propTypes = {
  comment: PropTypes.shape(CommentShape).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  hasUpVoted: PropTypes.bool.isRequired,
  hasDownVoted: PropTypes.bool.isRequired,
};

export default CommentItem;
