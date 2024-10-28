import { FormEvent, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../shared/context/Context';
import FormCard from '../../components/FormCard';
import FormContainer from '../../components/FormContainer';
import TextInput from '../../components/TextInput';
import { Loading } from '../../shared/loading/Loading';
import FormHeading from '../../components/FormHeading';

function Login() {

  const { api, store } = useAppContext();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = loginForm;
    const $user = await api.auth.login(email, password);
    if (!$user) {
      setErrorMessage('Login failed. Please try again.');
      setLoading(false);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }
    setLoading(false);
  };

  if (store.auth.loading) return <Loading fullHeight />;
  if (store.auth.me && !store.auth.loading) {
    const state = location.state as { from: Location };
    if (state && state.from) return <Navigate to={state.from.pathname} />;
    return <Navigate to="/listings" />;
  }

  return (
    <FormContainer>
      <FormCard>
        <FormHeading>Welcome Back</FormHeading>
        {errorMessage && (
          <div className="p-2 mb-4 text-center text-md rounded-md bg-red-500 text-white" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <TextInput
              label="Email"
              id="email"
              name="email"
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-8">
            <TextInput
              label="Password"
              id="password"
              name="Password"
              type={showPassword ? 'text' : 'password'}
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              required
            />
          </div>
          <div className="mb-2">
            <label className="label">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={toggleShowPassword}
              />
              Show Password
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block mx-0 mb-8"
            disabled={loading}>
            Login
          </button>
        </form>
        <p className="text-center text-md mb-2">
          <Link to="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </p>
        <p className="text-center text-md mb-2">
          Not Registered?
          <Link to="/register" className="text-primary hover:underline">
            {" "} Register
          </Link>
        </p>
      </FormCard>
    </FormContainer>
  );
}

export default Login;
