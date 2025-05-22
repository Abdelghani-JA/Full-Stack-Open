import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import blogsReducer from './reducers/blogsReducer';
import usersReducer from './reducers/usersReducer';
import currentUserReducer from './reducers/currentUserReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    users: usersReducer,
    currentUser: currentUserReducer
  }
});

export default store;
