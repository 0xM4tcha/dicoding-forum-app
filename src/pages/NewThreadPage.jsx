import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewThreadInput from '@/components/Inputs/NewThreadInput';
import { asyncCreateThread } from '@/states/threads/action';

function NewThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCreateThread = ({ title, body, category }) => {
    dispatch(asyncCreateThread({ title, body, category }));

    navigate('/');
  };

  return (
    <main>
      <div className="new-thread-page">
        <h2>Buat Diskusi Baru</h2>
        <NewThreadInput createThread={onCreateThread} />
      </div>
    </main>
  );
}

export default NewThreadPage;
