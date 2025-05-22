import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import { Provider } from 'react-redux';
import store from './store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BlogsRoute from './routes/BlogsRoute';
import UsersRoute from './routes/UsersRoute';
import UserRoute from './routes/UserRoute';
import BlogRoute from './routes/BlogRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <BlogsRoute />
      },
      {
        path: 'users',
        element: <UsersRoute />
      },
      {
        path: 'users/:id',
        element: <UserRoute />
      },
      {
        path: 'blogs/:id',
        element: <BlogRoute />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
