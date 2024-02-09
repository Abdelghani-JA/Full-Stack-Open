import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', timeout: 0 },
  reducers: {
    setNotification(state, action) {
      const notification = action.payload
      return notification
    },
    removeNotification() {
      return { message: '', timeout: 0 }
    }
  }
})

export const setNotificationTime = (message, timeout) => {
  return dispatch => {
    dispatch(setNotification({ message, timeout }))
  }
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer