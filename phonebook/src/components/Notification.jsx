const Notification = ({ message, className}) => {
  if (message === null) {
    return null
  }

  return (
      <div className={className}>
        {message}
      </div>
  )
}

const SuccessNotification = (props) => {
  return <Notification { ...props } className='success' />
}

const ErrorNotification = (props) => {
  return <Notification { ...props } className='error' />
}

export default {
  Success: SuccessNotification,
  Error: ErrorNotification
}
