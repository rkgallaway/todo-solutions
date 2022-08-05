import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/Auth';
import useForm from '../../hooks/form.js';

const Login = () => {

  const [defaultValues] = useState({})
  const { login } = useContext(AuthContext);
  const { handleChange, handleSubmit } = useForm(loginUser, defaultValues);

  function loginUser({ username, password }) {
    console.log(username, password)
    login(username, password);
  }

  return (
    <>
        <h3>Login</h3>
        <form id="login" onSubmit={handleSubmit}>
          <label>
            <span>Username</span>
            <input data-testid="username" onChange={handleChange} name="username" type="text" placeholder="username" />
          </label>

          <label>
            <span>Password</span>
            <input data-testid="password" onChange={handleChange} name="password" type="text" placeholder="password" />
          </label>

          <label>
            <button data-testid="login" type="submit">submit</button>
          </label>
        </form>
    </>
  )

};

export default Login;
