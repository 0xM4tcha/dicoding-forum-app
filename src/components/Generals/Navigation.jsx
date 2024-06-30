import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ThreadsIcon from '@/assets/ThreadsIcon.jsx';
import LeaderboardIcon from '@/assets/LeaderboardIcon.jsx';
import LoginIcon from '@/assets/LoginIcon.jsx';
import LogoutIcon from '@/assets/LogoutIcon.jsx';
import { asyncUnsetAuthUser } from '@/states/authUser/action';
import { asyncPreloadProcess } from '@/states/isPreload/action';

function Navigation() {
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const navigations = [
    {
      title: 'Threads',
      route: '/',
      icon: <ThreadsIcon />,
    },
    {
      title: 'Leaderboards',
      route: '/leaderboards',
      icon: <LeaderboardIcon />,
    },
  ];

  function onLogout() {
    dispatch(asyncUnsetAuthUser());

    navigate('/login');
  }

  return (
    <footer>
      <div className="navigation-bottom">
        <nav>
          {navigations.map((navigation, idx) => (
            <Link to={navigation.route} key={idx} data-testid={`nav-${navigation.title}`}>
              <button type="button" className="navigation-item">
                <div className="navigation-item__icon">{navigation.icon}</div>
                <p className="navigation-item__label">{navigation.title}</p>
              </button>
            </Link>
          ))}
          {authUser ? (
            <button
              type="button"
              className="navigation-item"
              data-testid="nav-logout"
              onClick={onLogout}
            >
              <div className="navigation-item__icon">
                <LogoutIcon />
              </div>
              <p className="navigation-item__label">Logout</p>
            </button>
          ) : (
            <Link to="/login" data-testid="nav-login">
              <button type="button" className="navigation-item">
                <div className="navigation-item__icon">
                  <LoginIcon />
                </div>
                <p className="navigation-item__label">Login</p>
              </button>
            </Link>
          )}
        </nav>
      </div>
    </footer>
  );
}

export default Navigation;
