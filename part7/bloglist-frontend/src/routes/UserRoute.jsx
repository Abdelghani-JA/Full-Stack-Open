import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Blog from '../components/Blog';

const UserRoute = () => {
  const urlParams = useParams();
  const user = useSelector((state) =>
    state.users.find((user) => user.id === urlParams.id)
  );
  const currentUser = useSelector((state) => state.currentUser);
  return (
    <div className="blogsContainer flex flex-col gap-[20px]">
      <span>
        {user.name}'s <strong>added blogs:</strong>
      </span>

      {user.blogs.map((blog) => (
        <Blog key={blog.id} blogId={blog.id} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default UserRoute;
