const Notification = ({ notificationBar: { message, status } }) => {
  if(message === null) {
    return null
  } else {
    return <p className={status} id='notification'>{message}</p>
  }
}


export default Notification