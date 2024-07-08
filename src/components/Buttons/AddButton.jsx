import React from 'react';
import { Link } from 'react-router-dom';
import NewThreadIcon from '@/assets/NewThreadIcon';

function AddButton() {
  return (
    <Link to="/new">
      <button type="button" data-testid="add-button" className="new-thread-button">
        <NewThreadIcon />
      </button>
    </Link>
  );
}

export default AddButton;
