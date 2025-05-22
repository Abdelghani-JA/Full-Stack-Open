import { useState, Fragment } from 'react';
import blogService from '../services/blogs';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, deleteBlog, createComment } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';
import CommentForm from '../components/CommentForm';

const BlogRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser);
  const blogId = useParams().id;
  const [blog, setBlog] = useState(null);

  if (!blog) {
    blogService.getAll().then((blogs) => {
      setBlog(blogs.find((blog) => blog.id === blogId));
    });
  }
  const handleLikes = async () => {
    const likedBlog = {
      ...blog,
      user: blog.user[0].id,
      likes: blog.likes + 1
    };
    try {
      const updatedBlog = await blogService.update(likedBlog, blog.id);
      dispatch(likeBlog({ ...updatedBlog, user: blog.user }));
      setBlog({ ...updatedBlog, user: blog.user });
    } catch (error) {
      alert(error.message);
    }
  };
  const handleDelete = async () => {
    const confirm = window.confirm(`Remove blog: ${blog.title} ?`);
    if (confirm) {
      try {
        await blogService.remove(blog.id);
        dispatch(deleteBlog(blog.id));
        dispatch(
          setNotification({ message: "blog's deleted", status: 'success' })
        );
        navigate('/');
      } catch (error) {
        alert(error.message);
      }
    }
  };
  const handleComment = async (newComment) => {
    try {
      const savedBlog = await blogService.createComment(newComment, blog.id);
      setBlog({
        ...savedBlog,
        user: [{ name: currentUser.name, username: currentUser.username }]
      });
      dispatch(
        createComment({
          ...savedBlog,
          user: [{ name: currentUser.name, username: currentUser.username }]
        })
      );
      dispatch(
        setNotification({
          message: 'Comment added successfully',
          status: 'success'
        })
      );
    } catch (error) {
      alert(error.message);
      dispatch(
        setNotification({
          message: error.response.data.error,
          status: 'error'
        })
      );
    }
  };
  const blogDetails = (blog) => {
    return (
      <>
        <div className="blogBox **:text-[1.2rem] **:font-light flex flex-col gap-[5px] rounded-[10px] bg-white p-4">
          <span>{blog.title}</span>
          <a href={blog.url}>{blog.url}</a>
          <p>
            {blog.likes} likes
            <button
              onClick={handleLikes}
              className="cursor-pointer rounded-sm border-none bg-green-500 p-[0_0.6rem] text-[1.2rem] text-white"
            >
              like
            </button>
          </p>
          <p>Added by {blog.user[0].name}</p>
          {blog.user[0].username === currentUser.username ? (
            <button
              onClick={handleDelete}
              className="cursor-pointer self-start rounded-sm border-none bg-red-500 p-[0_0.6rem] text-[1.2rem] text-white"
            >
              delete
            </button>
          ) : null}
        </div>

        <CommentForm handleComment={handleComment} />

        <ul className="commentsBox">
          <span className="font-medium">Comments</span>
          {blog.comments.length ? (
            <div className="flex flex-col bg-white p-[0.5rem]">
              {blog.comments.map((comment, index, arr) => (
                <Fragment key={comment.id}>
                  <li className={'comment list-none p-[0.5rem_0]'}>
                    {comment.body}
                  </li>
                  {!(index + 1 == arr.length) && (
                    <hr className="w-9/10 self-center" />
                  )}
                </Fragment>
              ))}
            </div>
          ) : null}
        </ul>
      </>
    );
  };
  return blog ? blogDetails(blog) : null;
};

export default BlogRoute;
