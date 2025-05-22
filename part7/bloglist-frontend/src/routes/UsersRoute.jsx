import { useEffect } from 'react';
import usersService from '../services/users';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../reducers/usersReducer';

const getUsers = async () => {
  const tosortUsers = await usersService.getAll();
  return tosortUsers.sort(
    (user1, user2) => user2.blogs.length - user1.blogs.length
  );
};

const UsersRoute = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  let primaryColor = true;

  useEffect(() => {
    getUsers().then((users) => {
      dispatch(setUsers(users));
    });
  }, []);
  return (
    <div className="usersRouteBox">
      <table className="w-9/10 table-collapse m-[0_auto] max-w-[700px] rounded-tl-sm rounded-tr-sm border-b-2 bg-[#019879] text-[1.2rem]">
        <caption>Users' created blogs</caption>
        <thead>
          <tr className="primary">
            <th id="head" className="p-[0.1rem] text-center text-white">
              Users
            </th>
            <th className="p-[0.1rem] text-center text-white">Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            primaryColor = !primaryColor;
            return (
              <tr
                key={user.id}
                className={
                  primaryColor
                    ? 'primaryColor bg-white'
                    : 'secondaryColor bg-[#f3f3f3]'
                }
              >
                <td className="p-[0.1rem] text-center">
                  <Link to={`/users/${user.id}`} className="underline">
                    {user.name}
                  </Link>
                </td>
                <td className="p-[0.1rem] text-center">
                  <strong>{user.blogs.length}</strong>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersRoute;
