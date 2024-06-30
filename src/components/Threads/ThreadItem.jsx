import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { postedAt } from '@/utils';
import ReplyIcon from '@/assets/ReplyIcon';
import UpVoteButton from '@/components/Buttons/UpVoteButton';
import DownVoteButton from '@/components/Buttons/DownVoteButton';

function ThreadItem({ thread, upVote, downVote, hasUpVoted, hasDownVoted }) {
  const {
    id,
    category,
    title,
    body,
    createdAt,
    totalComments,
    user,
    upVotesBy,
    downVotesBy,
  } = thread;

  return (
    <div className="thread-item">
      <header className="thread-item__header">
        <span className="thread-item__category">#{category}</span>
        <h4 className="thread-item__title">
          <Link to={`/threads/${id}`}>{title}</Link>
        </h4>
      </header>
      <div
        className="thread-item__body"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <footer className="thread-item__footer">
        <UpVoteButton
          hasVoted={hasUpVoted}
          totalVote={upVotesBy?.length}
          onClick={upVote}
        />
        <DownVoteButton
          hasVoted={hasDownVoted}
          totalVote={downVotesBy?.length}
          onClick={downVote}
        />
        <p className="thread-item__total-comments">
          <ReplyIcon /> {totalComments}
        </p>
        <p>{postedAt(createdAt)}</p>
        <p className="thread-item__owner">
          Dibuat oleh <strong>{user.name}</strong>
        </p>
      </footer>
    </div>
  );
}

const userShape = {
  avatar: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const ThreadShape = {
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ThreadItem.propTypes = {
  thread: PropTypes.shape(ThreadShape).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  hasUpVoted: PropTypes.bool.isRequired,
  hasDownVoted: PropTypes.bool.isRequired,
};

export default ThreadItem;
