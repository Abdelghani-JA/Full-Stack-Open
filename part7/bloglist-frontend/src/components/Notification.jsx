const Notification = ({ notificationBar: { message, status } }) => {
  if (message === '') {
    return null;
  } else {
    return (
      <p
        className={
          (status == 'success' ? 'bg-green-600/70 ' : 'bg-red-500/70 ') +
          'z-1 fixed left-0 top-0 w-full p-4 text-[1rem] text-white'
        }
        id="notification"
      >
        {message}
      </p>
    );
  }
};

export default Notification;
