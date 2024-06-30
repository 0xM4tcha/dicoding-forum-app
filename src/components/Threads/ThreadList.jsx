import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadList({ authUser, threads, upVote, downVote }) {
  const hasUpVoted = (thread) => thread.upVotesBy.includes(authUser?.id);

  const hasDownVoted = (thread) => thread.downVotesBy.includes(authUser?.id);

  return (
    <div className="home-page__content">
      <h2>Diskusi tersedia</h2>
      <div className="threads-list">
        {threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            thread={thread}
            upVote={() => upVote(thread.id)}
            downVote={() => downVote(thread.id)}
            hasDownVoted={hasDownVoted(thread)}
            hasUpVoted={hasUpVoted(thread)}
          />
        ))}
      </div>
    </div>
  );
}

const userShape = {
  avatar: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const ThreadShape = PropTypes.shape({
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
});

ThreadList.propTypes = {
  authUser: PropTypes.shape(userShape),
  threads: PropTypes.arrayOf(ThreadShape).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  hasUpVoted: PropTypes.bool,
  hasDownVoted: PropTypes.bool,
};

export default ThreadList;
