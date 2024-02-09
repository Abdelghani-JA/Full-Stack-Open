import { useDispatch, useSelector } from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'
import { setNotificationTime } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filterKeyword = useSelector(state => state.filter)

  const filteredList = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filterKeyword.toLowerCase()))
  filteredList.sort((anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes)

  const vote = (anecdote) => {
    dispatch(incrementVotes(anecdote))
    dispatch(setNotificationTime(`${anecdote.content} : has been voted`, 5000))
  }

  return (
    filteredList.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}




export default AnecdoteList