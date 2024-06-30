import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem from './LeaderboardItem';

function LeaderboardList({ leaderboards }) {
  return (
    <div className="leaderboards-list">
      <header>
        <p className="leaderboards-list__user-label">Pengguna</p>
        <p className="leaderboards-list__score-label">Skor</p>
      </header>
      {leaderboards.map(({ user, score }) => (
        <LeaderboardItem key={user.id} user={user} score={score} />
      ))}
    </div>
  );
}

const userShape = {
  avatar: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const LeaderboardShape = PropTypes.shape({
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
});

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(LeaderboardShape).isRequired,
};

export default LeaderboardList;
