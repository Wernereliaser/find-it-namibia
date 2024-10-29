import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../shared/context/Context';
import FormCard from '../../components/FormCard';
import FormContainer from '../../components/FormContainer';
import TextInput from '../../components/TextInput';
import FormHeading from '../../components/FormHeading';

function Login() {

  const { api } = useAppContext();
  const navigate = useNavigate();

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
    navigate("/home")
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
