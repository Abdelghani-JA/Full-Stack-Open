import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

const createAnecdote = newAnecdote =>
  axios.post(baseUrl, newAnecdote).then(res => res.data)

const updateAnecdote = update =>
  axios.put(`${baseUrl}/${update.id}`, update).then(res => res.data)



export default {getAnecdotes, createAnecdote, updateAnecdote}