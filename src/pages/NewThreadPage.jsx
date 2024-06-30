import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewThreadInput from '@/components/Inputs/NewThreadInput';
import { asyncCreateThread } from '@/states/threads/action';

function NewThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((states) => states.authUser);

  const onCreateThread = async ({ title, body, category }) => {
    const thread = await dispatch(asyncCreateThread({ title, body, category }));

    if (thread) {
      navigate('/');
    }
  };

  if (!authUser) {
    return (<></>);
  }

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
