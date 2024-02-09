import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import service from './requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'


const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  queryClient.setMutationDefaults(['addAnecdote'], {
    mutationFn: service.createAnecdote,
    onSuccess: (newAnecdote) => {
      notificationDispatch({type:'setNotification', payload:'Anecdote created'})
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote)) 
    },
    onError: ({ response: { data: { error } } }) => {
      notificationDispatch({type:'setNotification', payload:error})
    }

  })

  const updateMutation = useMutation({
    mutationFn: service.updateAnecdote,
    onSuccess: (newAnecdote) => {
      notificationDispatch({type:'setNotification', payload:'Anecdote voted'})
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], () => {
        return anecdotes.map(anecdote => {
          return anecdote.id === newAnecdote.id ? newAnecdote : anecdote
        })
      }) 
    },
    onError: (error) => {
      notificationDispatch({type:'setNotification', payload:error.message})
    }
  })

  const anecdoteQuery = new useQuery({
    queryKey: ['anecdotes'],
    queryFn:service.getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false
  })

  if ( anecdoteQuery.isLoading ) {
    return <div>loading data...</div>
  }
  if ( anecdoteQuery.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = anecdoteQuery.data

  const handleVote = (anecdote) => {
    updateMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
