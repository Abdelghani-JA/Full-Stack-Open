import { createSlice } from '@reduxjs/toolkit';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    createNewBlog(state, action) {
      state.push(action.payload);
    },
    likeBlog(state, action) {
      const blogId = action.payload.id;
      const likedBlog = action.payload;
      const blogIndex = state.findIndex((blog) => blog.id === blogId);
      state[blogIndex] = likedBlog;
    },
    deleteBlog(state, action) {
      const blogId = action.payload;
      return state.filter((blog) => blog.id !== blogId);
    },
    createComment(state, action) {
      const blogId = action.payload.id;
      const commentedBlog = action.payload;
      const blogIndex = state.findIndex((blog) => blog.id === blogId);
      state[blogIndex] = commentedBlog;
    }
  }
});

export const { setBlogs, createNewBlog, likeBlog, deleteBlog, createComment } =
  blogsSlice.actions;
export default blogsSlice.reducer;
