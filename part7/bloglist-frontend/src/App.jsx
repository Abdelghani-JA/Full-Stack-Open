import { useState } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { setBlogs } from './reducers/blogsReducer';
import { setUser } from './reducers/currentUserReducer';
import { Outlet, NavLink } from 'react-router-dom';
import hamburgerUrl from './assets/hamburger.svg';
import hamburgerClosedUrl from './assets/hamburgerClosed.svg';

const App = () => {
  console.log('App');
  const dispatch = useDispatch();
  const notificationBar = useSelector((state) => state.notification);
  const user = useSelector((state) => state.currentUser);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [sidebar, setSidebar] = useState(false);
  const [logged, setLogged] = useState(false);
  const token = window.localStorage.getItem('loggedBlogsUser');

  const getBlogs = () => {
    blogService.getAll().then((tosortBlogs) => {
      tosortBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes);
      dispatch(setBlogs(tosortBlogs));
    });
  };

  if (token && !logged) {
    const user = JSON.parse(token);
    getBlogs();
    dispatch(setUser(user));
    blogService.setToken(user.token);
    setLogged(true);
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user));
      dispatch(setUser(user));
      blogService.setToken(user.token);
      setCredentials({ username: '', password: '' });
      getBlogs();
      dispatch(setNotification({ message: 'logged in', status: 'success' }));
    } catch (error) {
      setCredentials({ username: '', password: '' });
      dispatch(
        setNotification({ message: error.response.data.error, status: 'error' })
      );
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsUser');
    blogService.setToken(null);
    dispatch(setUser(null));
    dispatch(setBlogs([]));
    dispatch(setNotification({ message: 'logged out', status: 'success' }));
    setSidebar(false);
  };

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const userHome = () => {
    return (
      <div
        className="homeRoute min-h-screen"
        onClick={sidebar ? toggleSidebar : undefined}
      >
        <nav className="left-0 top-0 flex items-center justify-end bg-white p-[0.5rem_1rem] lg:block">
          {!sidebar ? (
            <img
              src={hamburgerUrl}
              alt="Menu"
              width="32px"
              height="32px"
              onClick={toggleSidebar}
              className="menuIcon lg:hidden"
            />
          ) : (
            <img
              src={hamburgerClosedUrl}
              alt="Menu"
              width="32px"
              height="32px"
              onClick={toggleSidebar}
              className="menuIcon lg:hidden"
            />
          )}
          <div
            className={`sidebar${sidebar ? ' block' : ' hidden'} absolute right-0 top-[3.2rem] h-[calc(100vh-3.2rem)] w-full bg-[rgba(0,0,0,0.432)] lg:static lg:block lg:h-auto lg:bg-transparent`}
          >
            <div
              className={`sidebarContainer${sidebar ? ' column' : ' row'} absolute right-0 flex h-full w-1/2 flex-col items-center gap-[20px] bg-[#019879] p-[20px] text-white
               lg:static lg:h-auto lg:w-auto lg:flex-row lg:justify-evenly lg:gap-0 lg:bg-white lg:p-0 lg:text-black`}
            >
              <NavLink
                to={'/'}
                className={({ isActive }) =>
                  `text-inherit lg:text-[#019879] ${isActive ? 'underline' : ''}`
                }
              >
                Blogs
              </NavLink>
              <NavLink
                to={'/users'}
                className={({ isActive }) =>
                  `text-inherit lg:text-[#019879] ${isActive ? 'underline' : ''}`
                }
              >
                Users
              </NavLink>

              <span>{user ? user.name + ' logged in' : ''}</span>
              <input
                value="Logout"
                type="button"
                onClick={handleLogout}
                className="logoutBtn text-4 cursor-pointer rounded-sm border-none bg-white p-[0.3rem] text-red-500"
              />
            </div>
          </div>
        </nav>
        <main className="m-[0_auto] max-w-[64em] p-[1rem_1rem]">
          <Outlet />
        </main>
      </div>
    );
  };

  return (
    <>
      <Notification notificationBar={notificationBar} />
      {!user ? (
        <LoginForm
          handleLogin={handleLogin}
          handleCredentials={{ credentials, setCredentials }}
        />
      ) : (
        userHome()
      )}
    </>
  );
};

export default App;
