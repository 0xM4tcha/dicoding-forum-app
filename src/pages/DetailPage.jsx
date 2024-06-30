import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncReceiveThreadDetail,
  asyncUpVoteThread,
  asyncCreateComment,
  asyncDownVoteThread,
  asyncUpVoteComment,
  asyncDownVoteComment,
} from '@/states/threadDetail/action';
import ThreadDetail from '@/components/Threads/ThreadDetail';
import CommentInput from '@/components/Inputs/CommentInput';
import CommentList from '@/components/Comments/CommentList';

function DetailPage() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const authUser = useSelector((states) => states.authUser);
  const thread = useSelector((states) => states.threadDetail);

  const hasUpVoted = thread?.upVotesBy.includes(authUser?.id);
  const hasDownVoted = thread?.downVotesBy.includes(authUser?.id);

  useEffect(() => {
    if (id) {
      dispatch(asyncReceiveThreadDetail(id));
    }
  }, [id, dispatch]);

  if (!thread) {
    return null;
  }

  const onSubmitComment = ({ content }) => {
    dispatch(asyncCreateComment({ id, content }));
  };

  const onUpVote = () => {
    dispatch(asyncUpVoteThread({ threadId: id }));
  };

  const onDownVote = () => {
    dispatch(asyncDownVoteThread({ threadId: id }));
  };

  const onUpVoteComment = (commentId) => {
    dispatch(asyncUpVoteComment({ threadId: id, commentId }));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncDownVoteComment({ threadId: id, commentId }));
  };

  const hasVotedComment = () => false;

  return (
    <main>
      <ThreadDetail
        thread={thread}
        upVote={onUpVote}
        downVote={onDownVote}
        hasUpVoted={hasUpVoted}
        hasDownVoted={hasDownVoted}
      />
      <div className="thread-comment">
        <div className="thread-comment__input">
          <h3>Beri komentar</h3>
          {authUser ? (
            <CommentInput comment={onSubmitComment} />
          ) : (
            <p className="thread-comment__not_login">
              <Link to="/login">Login</Link> untuk memberi komentar 
            </p>
          )}
        </div>
        <div className="thread-comment__list">
          <h3>Komentar ({thread.comments.length})</h3>
          <CommentList
            comments={thread.comments}
            authUser={authUser}
            upVote={onUpVoteComment}
            downVote={onDownVoteComment}
            hasVoted={hasVotedComment}
          />
        </div>
      </div>
    </main>
  );
}

export default DetailPage;
