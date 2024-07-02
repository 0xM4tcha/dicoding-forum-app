import React from 'react';
import PropTypes from 'prop-types';
import useInput from '@/hooks/useInput';

function CommentInput({ comment }) {
  const [content, onContentChange] = useInput('');

  const onSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const content = document.getElementById('content').innerHTML;
    formData.append('content', content);
    comment(Object.fromEntries(formData.entries()));
  };

  return (
    <form className="comment-input" onSubmit={onSubmit}>
      <div
        id="content"
        className="comment-input__field"
        data-testid="content"
        contentEditable
        value={content}
        onChange={onContentChange}
      />
      <button type="submit" data-testid="submit-button">Kirim</button>
    </form>
  );
}

CommentInput.propTypes = {
  comment: PropTypes.func.isRequired,
};

export default CommentInput;
