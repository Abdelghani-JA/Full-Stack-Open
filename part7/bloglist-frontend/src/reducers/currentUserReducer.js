import { createSlice } from '@reduxjs/toolkit';

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: null,
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      return user;
    }
  }
});

export const { setUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
