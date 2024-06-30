import React from 'react';
import PropTypes from 'prop-types';
import UpVoteIcon from '@/assets/UpVoteIcon';
import UpVoteActiveIcon from '@/assets/UpVoteActiveIcon';

function UpVoteButton({ hasVoted = false, totalVote, onClick }) {
  return (
    <button type="button" className="thread-upvote__button" onClick={onClick}>
      {hasVoted ? <UpVoteActiveIcon /> : <UpVoteIcon />}
      <span className="thread-upvote__label">{totalVote}</span>
    </button>
  );
}

UpVoteButton.propTypes = {
  hasVoted: PropTypes.bool,
  totalVote: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

export default UpVoteButton;
