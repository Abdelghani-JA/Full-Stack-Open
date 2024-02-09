import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      const keyword = action.payload
      return keyword
    }
  }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer

