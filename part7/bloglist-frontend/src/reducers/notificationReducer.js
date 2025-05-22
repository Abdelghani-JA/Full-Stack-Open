import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', status: '' },
  reducers: {
    setNotificationState(state, action) {
      const notification = action.payload;
      return notification;
    },
    resetNotification() {
      return { message: '', status: '' };
    }
  }
});

export const setNotification = (message) => {
  return (dispatch) => {
    dispatch(setNotificationState(message));
    setTimeout(() => {
      dispatch(resetNotification());
    }, 2500);
  };
};

export const { setNotificationState, resetNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
