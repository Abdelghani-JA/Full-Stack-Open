import { useState, useId } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const titleInputId = useId();
  const authorInputId = useId();
  const urlInputId = useId();

  const addBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog).then(() => {
      setNewBlog({ title: '', author: '', url: '' });
    });
  };

  return (
    <form
      onSubmit={addBlog}
      className="newBlogForm flex flex-col justify-center gap-[5px]"
    >
      <div>
        <label
          className="text-4 font-light text-[#252a34]"
          htmlFor={titleInputId}
        >
          Title
        </label>
        <input
          className="block h-[2.4rem] w-full border border-[#252a34] bg-[#cbfdfc] p-[0.3rem] text-[1.2rem] focus:outline-[2px] focus:outline-[#252a34]"
          id={titleInputId}
          value={newBlog.title}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, title: target.value })
          }
        />
      </div>
      <div>
        <label
          className="text-4 font-light text-[#252a34]"
          htmlFor={authorInputId}
        >
          Author
        </label>
        <input
          className="block h-[2.4rem] w-full border border-solid border-[#252a34] bg-[#cbfdfc] p-[0.3rem] text-[1.2rem] focus:outline-[2px] focus:outline-[#252a34]"
          id={authorInputId}
          value={newBlog.author}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, author: target.value })
          }
        />
      </div>
      <div>
        <label
          className="text-4 font-light text-[#252a34]"
          htmlFor={urlInputId}
        >
          Url
        </label>
        <input
          className="block h-[2.4rem] w-full border border-solid border-[#252a34] bg-[#cbfdfc] p-[0.3rem] text-[1.2rem] focus:outline-[2px] focus:outline-[#252a34]"
          id={urlInputId}
          value={newBlog.url}
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, url: target.value })
          }
        />
      </div>
      <button
        className="bg-button basis-8 cursor-pointer self-start rounded-sm border-none p-[0.1rem_1rem] text-[1.2rem] text-white hover:bg-[#a71f41] hover:outline-none focus:bg-[#a71f41] focus:outline-none"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default BlogForm;
