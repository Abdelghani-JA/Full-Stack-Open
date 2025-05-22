import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      const users = action.payload;
      return users;
    }
  }
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
