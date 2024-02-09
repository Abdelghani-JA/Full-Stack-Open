import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote(state, action) {
      const content = action.payload
      state.push(content)
    },
    voteAnecdote(state, action) {
      const updateAnec = action.payload
      const anecToVote = state.find(anecdote => anecdote.id === updateAnec.id)
      anecToVote.votes = updateAnec.votes
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(newAnecdote(anecdote))
  }
}

export const incrementVotes = (anecdote) => {
  return async dispatch => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const response = await anecdoteService.update(newAnecdote)
    dispatch(voteAnecdote(response))
  }
}


export const { newAnecdote, voteAnecdote, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer