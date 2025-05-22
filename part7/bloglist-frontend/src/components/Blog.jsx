import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Blog = ({ blogId }) => {
  const currentBlog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === blogId)
  );

  return (
    <Link
      to={`/blogs/${currentBlog.id}`}
      className="blogBrief rounded-[10px] bg-white p-[2rem_1rem] text-[#252a34]"
    >
      {currentBlog.title}
    </Link>
  );
};

export default Blog;
