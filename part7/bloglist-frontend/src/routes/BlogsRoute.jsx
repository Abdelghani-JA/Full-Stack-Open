import Blog from '../components/Blog';
import Togglable from '../components/Togglable';
import BlogForm from '../components/BlogForm';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import blogService from '../services/blogs';
import { createNewBlog } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogsRoute = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const blogs = useSelector((state) => state.blogs);
  const togglableRef = useRef();

  const createBlog = async (newBlog) => {
    togglableRef.current.handleVisibility();
    try {
      const savedBlog = await blogService.create(newBlog);
      dispatch(
        createNewBlog({
          ...savedBlog,
          user: [{ name: currentUser.name, username: currentUser.username }]
        })
      );
      dispatch(
        setNotification({
          message: 'blog added successfully',
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
  return (
    <>
      <Togglable
        buttonLabel="New blog"
        ref={togglableRef}
        class={
          'newBlogBtn bg-button fixed bottom-[10px] right-[10px] cursor-pointer rounded-sm border-none p-[0.6rem] text-[1.2rem] text-white hover:bg-[#a71f41] hover:outline-none focus:bg-[#a71f41] focus:outline-none'
        }
      >
        {/* in react 19 ref is available as prop without using forwardRef */}
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <div className="blogsContainer flex flex-col gap-[20px]">
        {blogs.map((blog) => (
          <Blog key={blog.id} blogId={blog.id} currentUser={currentUser} />
        ))}
      </div>
    </>
  );
};

export default BlogsRoute;
