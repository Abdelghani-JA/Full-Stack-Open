import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, handleCredentials: { credentials, setCredentials } }) => {

  return (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Log in</h2>
      Username :
        <input value={credentials.username} type='text'
          name='Username' id='username'
          onChange={({ target }) => setCredentials({ ...credentials, username: target.value })}/>
      </div>
      <div>
      Password :
        <input value={credentials.password}
          type='password' name='Password' id='password'
          onChange={({ target }) => setCredentials({ ...credentials, password: target.value })}/>
      </div>
      <button type="submit" id='login-button'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleCredentials: PropTypes.object.isRequired
}

export default LoginForm