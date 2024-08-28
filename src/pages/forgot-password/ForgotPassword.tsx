import FormHeading from '../../components/FormHeading';
import { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextInput from '../../components/TextInput';
import { useAppContext } from '../../shared/context/Context';
import FormContainer from '../../components/FormContainer';
import FormCard from '../../components/FormCard';

function ForgotPassword() {

  const { api } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { email } = loginForm;
    await api.auth.sendEmail(email);
    setLoading(false);
    navigate("/");
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, email: e.target.value })
  }

  return (
    <FormContainer>
      <FormCard>
        <FormHeading>Reset password</FormHeading>
        <div className="mb-4">
          <TextInput
            label="Email"
            id="email"
            name="email"
            type="email"
            value={loginForm.email}
            onChange={onEmailChange}
            required />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block mx-0"
          disabled={loading}>
          Send reset link
        </button>
        <p className="text-center text-md mt-4">
          <Link to="/" className="text-primary hover:underline">
            Back
          </Link>
        </p>
      </FormCard>
    </FormContainer>
  );
}

export default ForgotPassword;
