import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeaderboardList from '@/components/Leaderboards/LeaderboardList';
import { asyncReceiveLeaderboards } from '@/states/leaderboards/action';

function LeaderboardsPage() {
  const leaderboards = useSelector((states) => states.leaderboards);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <main>
      <div className="board-page">
        <h2>Klasmen Pengguna Aktif</h2>
        <LeaderboardList leaderboards={leaderboards} />
      </div>
    </main>
  );
}

export default LeaderboardsPage;
