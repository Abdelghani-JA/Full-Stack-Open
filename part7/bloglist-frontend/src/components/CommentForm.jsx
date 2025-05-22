import { useState, useId } from 'react';

const CommentForm = ({ handleComment }) => {
  const [newComment, setNewComment] = useState({ body: '' });
  const commentInputId = useId();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleComment(newComment).then(() => {
      setNewComment({ body: '' });
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="commentFormBox flex flex-col items-stretch gap-[5px]"
    >
      <label htmlFor={commentInputId}>Create a new comment: </label>
      <textarea
        className="rounded-sm border border-green-500 bg-white p-[0.3rem] focus:outline-[1px] focus:outline-green-600"
        id={commentInputId}
        value={newComment.body}
        onChange={({ target }) => setNewComment({ body: target.value })}
      ></textarea>
      <button
        type="submit"
        className="cursor-pointer self-start rounded-sm border-none bg-green-600 p-[0_0.6rem] text-[1.2rem] text-white focus:outline-none"
      >
        Comment
      </button>
    </form>
  );
};

export default CommentForm;
