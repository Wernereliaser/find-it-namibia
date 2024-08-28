import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../shared/context/Context";
import { IUser, defaultUser } from "../../shared/model/User";
import { observer } from "mobx-react-lite";
import FormCard from "../../components/FormCard";
import FormContainer from "../../components/FormContainer";
import FormHeading from "../../components/FormHeading";
import { toast } from "react-toastify";

const Register = observer(() => {

  const navigate = useNavigate();
  const { api } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser>(defaultUser);

  const [passwordVerify, setPasswordVerify] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    if (user.password !== passwordVerify) {
      setErrorMessage('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await api.auth.register(user);
      setLoading(false);
      toast.success(`Success!`, { autoClose: 500 });
      navigate("/listing");
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onProceed = () => {
    navigate("/listing")
  }

  return (
    <FormContainer>
      <FormCard>
        <FormHeading>Get Started</FormHeading>
        <form onSubmit={onSubmit}>
          <div className="mb-2">
            <label className="label" htmlFor="user-role">
              Role
            </label>
            <select
              className="select select-bordered w-full"
              id="user-role"
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
              required>
              <option value={"Landlord"}>Landlord</option>
              <option value={"Tenant"}>Tenant</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="label" htmlFor="user-gender">
              Gender
            </label>
            <select
              className="select select-bordered w-full"
              id="user-gender"
              value={user.gender}
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
              required>
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="label" htmlFor="user-fullname">
              Full Name
            </label>
            <input
              className="input input-bordered w-full"
              id="user-fullname"
              type="text"
              value={user.displayName}
              onChange={(e) =>
                setUser({ ...user, displayName: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-2">
            <label className="label" htmlFor="user-email">
              Email Address
            </label>
            <input
              className="input input-bordered w-full"
              id="user-email"
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-2">
            <label className="label" htmlFor="user-phoneNumber">
              Phone Number
            </label>
            <input
              className="input input-bordered w-full"
              id="user-phoneNumber"
              type="tel"
              placeholder="+264"
              value={user.phoneNumber}
              onChange={(e) =>
                setUser({ ...user, phoneNumber: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-2">
            <label className="label" htmlFor="user-town">
              Town
            </label>
            <select
              className="select select-bordered w-full"
              id="user-region"
              value={user.town}
              onChange={(e) => setUser({ ...user, town: e.target.value })}
              required>
              <option value={"Walvis Bay"}>Walvis Bay</option>
              <option value={"Swakopmund"}>Swakopmund</option>
              <option value={"Luderitz"}>Luderitz</option>
              <option value={"Keetmanshoop"}>Keetmanshoop</option>
              <option value={"Noordoewer"}>Noordoewer</option>
              <option value={"Oshakati"}>Oshakati</option>
              <option value={"Otjiwarongo"}>Otjiwarongo</option>
              <option value={"Okahandja"}>Okahandja</option>
              <option value={"Tsumeb"}>Tsumeb</option>
              <option value={"Rundu"}>Rundu</option>
              <option value={"Windhoek"}>Windhoek</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="label" htmlFor="user-password">
              Create Password
            </label>
            <input
              className="input input-bordered w-full"
              id="user-password"
              type={showPassword ? 'text' : 'password'}
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-2">
            <label className="label" htmlFor="user-password-verify">
              Verify Password
            </label>
            <input
              className="input input-bordered w-full"
              id="user-password-verify"
              type={showPassword ? 'text' : 'password'}
              value={passwordVerify}
              onChange={(e) => setPasswordVerify(e.target.value)}
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
          {errorMessage && (
            <div className="uk-alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="mb-2">
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={loading}
            >Submit</button>
          </div>
          <p className="text-center text-md mb-2">
            Already have an account?
            <Link to="/login" className="text-primary hover:underline">
              {" "}Login
            </Link>
          </p>
        </form>
      </FormCard>
    </FormContainer>
  );
});

export default Register
