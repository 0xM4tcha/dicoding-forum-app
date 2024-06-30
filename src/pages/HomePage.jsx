import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '@/states/shared/action';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
} from '@/states/threads/action';
import AddButton from '@/components/Buttons/AddButton';
import ThreadList from '@/components/Threads/ThreadList';
import CategoryList from '@/components/Categories/CategoryList';
import Container from '@/components/styled/Container';

function HomePage() {
  const dispatch = useDispatch();

  const authUser = useSelector((states) => states.authUser);
  const threads = useSelector((states) => states.threads);
  const users = useSelector((states) => states.users);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser,
  }));

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setCategory] = useState('');
  const [filteredThreads, setFilteredThreads] = useState(threadList);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(threads.map((thread) => thread.category)),
    ];
    setCategories(uniqueCategories);
  }, [threads]);

  useEffect(() => {
    if (selectedCategory !== '') {
      const filtered = threadList.filter(
        (thread) => thread.category === selectedCategory
      );
      setFilteredThreads(filtered);
    } else {
      setFilteredThreads(threadList);
    }
  }, [threads, selectedCategory]);

  if (!threads) {
    return null;
  }

  const onUpVote = (threadId) => {
    dispatch(asyncUpVoteThread({ threadId }));
  };

  const onDownVote = (threadId) => {
    dispatch(asyncDownVoteThread({ threadId }));
  };

  const onSelectedCategory = (category) => {
    if (category === selectedCategory) {
      setCategory('');
    } else {
      setCategory(category);
    }
  };

  return (
    <Container>
      <section className="home-page">
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onClick={onSelectedCategory}
        />
        <ThreadList
          authUser={authUser}
          threads={filteredThreads}
          upVote={onUpVote}
          downVote={onDownVote}
        />
        {authUser && <AddButton />}
      </section>
    </Container>
  );
}

export default HomePage;
