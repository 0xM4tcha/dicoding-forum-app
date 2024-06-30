import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewThreadInput from '@/components/Inputs/NewThreadInput';
import { asyncCreateThread } from '@/states/threads/action';

function NewThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((states) => states.authUser);
  
  useEffect(() => {
    if (!authUser) {
      navigate('/');
    }
  }, [authUser])

  const onCreateThread = async ({ title, body, category }) => {
    const thread = await dispatch(asyncCreateThread({ title, body, category }));

    if (thread) {
      navigate('/');
    }
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
