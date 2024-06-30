import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewThreadInput from '@/components/Inputs/NewThreadInput';
import { asyncCreateThread } from '@/states/threads/action';
import Container from '@/components/styled/Container';

function NewThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCreateThread = ({ title, body, category }) => {
    dispatch(asyncCreateThread({ title, body, category }));

    navigate('/');
  };

  return (
    <Container>
      <div className="new-thread-page">
        <h2>Buat Diskusi Baru</h2>
        <NewThreadInput createThread={onCreateThread} />
      </div>
    </Container>
  );
}

export default NewThreadPage;
