import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

let timeoutId

const Notification = () => {
  const dispatch = useDispatch()
  const { message, timeout } = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (message) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, timeout)
  }

  return (
    !message ? null :
      <div style={style}>
        {message}
      </div>
  )
}

export default Notification