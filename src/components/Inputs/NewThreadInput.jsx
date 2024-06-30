import React from 'react';
import PropTypes from 'prop-types';
import useInput from '@/hooks/useInput';

function NewThreadInput({ createThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  function onSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const body = document.getElementById('body').innerHTML;
    formData.append('body', body);
    createThread(Object.fromEntries(formData.entries()));
  }

  return (
    <form className="new-thread-input" onSubmit={onSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Judul"
        value={title}
        onChange={onTitleChange}
      />
      <input
        name="category"
        type="text"
        placeholder="Kategori"
        value={category}
        onChange={onCategoryChange}
      />
      <div
        id="body"
        className="input-body"
        contentEditable
        value={body}
        onChange={onBodyChange}
      />
      <button type="submit">Buat</button>
    </form>
  );
}

NewThreadInput.propTypes = {
  createThread: PropTypes.func.isRequired,
};

export default NewThreadInput;
