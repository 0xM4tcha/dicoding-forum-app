import React from 'react';
import PropTypes from 'prop-types';
import { postedAt } from '@/utils';
import UpVoteButton from '@/components/Buttons/UpVoteButton';
import DownVoteButton from '@/components/Buttons/DownVoteButton';

function ThreadDetail({ thread, upVote, downVote, hasUpVoted, hasDownVoted }) {
  const { title, body, category, upVotesBy, downVotesBy, createdAt, owner } =
    thread;

  return (
    <section className="detail-page">
      <header className="thread-header">
        <p className="thread-header__category">#{category}</p>
      </header>
      <div className="thread-content">
        <h2>{title}</h2>
        <div
          className="thread-content__body"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
      <footer className="thread-footer">
        <UpVoteButton
          hasVoted={hasUpVoted}
          totalVote={upVotesBy.length}
          onClick={upVote}
        />
        <DownVoteButton
          hasVoted={hasDownVoted}
          totalVote={downVotesBy.length}
          onClick={downVote}
        />
        <div className="owner-info">
          <span>Dibuat oleh</span>
          <img src={owner.avatar} alt="avatar" />
          <span> {owner.name}</span>
        </div>
        <p>{postedAt(createdAt)}</p>
      </footer>
    </section>
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
  ownerId: PropTypes.string,
  totalComments: PropTypes.number,
  user: PropTypes.shape(userShape),
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ThreadDetail.propTypes = {
  thread: PropTypes.shape(ThreadShape).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  hasUpVoted: PropTypes.bool.isRequired,
  hasDownVoted: PropTypes.bool.isRequired,
};

export default ThreadDetail;
