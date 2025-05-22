import PropTypes from 'prop-types';
import { useId } from 'react';

const LoginForm = ({
  handleLogin,
  handleCredentials: { credentials, setCredentials }
}) => {
  const usernameInputId = useId();
  const passwordInputId = useId();
  return (
    <div className="loginRoute flex justify-center pt-4">
      <form
        onSubmit={handleLogin}
        className="loginForm  flex flex-col justify-center gap-[5px] rounded-xl bg-white px-12 py-16"
      >
        <div className="flex-1">
          <label
            className="text-4 font-light text-[#252a34]"
            htmlFor={usernameInputId}
          >
            Username
          </label>
          <input
            className="rounded-xs block h-[2.4rem] w-full border border-[#252a34] bg-[#cbfdfc] p-[0.3rem] text-[1.2rem] focus:outline-[#252a34]"
            value={credentials.username}
            type="text"
            name="Username"
            id={usernameInputId}
            onChange={({ target }) =>
              setCredentials({ ...credentials, username: target.value })
            }
          />
        </div>
        <div className="flex-1">
          <label
            className="text-4 font-light text-[#252a34]"
            htmlFor={passwordInputId}
          >
            Password
          </label>
          <input
            className="rounded-xs block h-[2.4rem] w-full border border-[#252a34] bg-[#cbfdfc] p-[0.3rem] text-[1.2rem] focus:outline-[#252a34]"
            value={credentials.password}
            type="password"
            name="Password"
            id={passwordInputId}
            onChange={({ target }) =>
              setCredentials({ ...credentials, password: target.value })
            }
          />
        </div>
        <button
          type="submit"
          id="login-button"
          className="bg-button hover:bg-button-second focus:bg-button-second w-20 basis-[2.7rem] cursor-pointer self-start rounded-sm text-[1.2rem] text-white focus:outline-none "
        >
          Login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleCredentials: PropTypes.object.isRequired
};

export default LoginForm;
