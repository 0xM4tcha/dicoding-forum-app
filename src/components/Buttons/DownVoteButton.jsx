import React from 'react';
import PropTypes from 'prop-types';
import DownVoteIcon from '@/assets/DownVoteIcon';
import DownVoteActiveIcon from '@/assets/DownVoteIconActive';

function DownVoteButton({ hasVoted, totalVote, onClick }) {
  return (
    <button type="button" className="thread-downvote__button" onClick={onClick}>
      {hasVoted ? <DownVoteActiveIcon /> : <DownVoteIcon />}
      <span className="thread-downvote__label">{totalVote}</span>
    </button>
  );
}

DownVoteButton.propTypes = {
  hasVoted: PropTypes.bool,
  totalVote: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

export default DownVoteButton;
