import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

let timeoutId

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notification) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      notificationDispatch({type:'removeNotification'})
    }, 3000)
  }

  return (
    !notification ? null :
      <div style={style}>
        {notification}
      </div>
  )
}

export default Notification
