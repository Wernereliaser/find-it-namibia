import { useNavigate } from "react-router-dom"
import FormCard from "../../components/FormCard";
import FormContainer from "../../components/FormContainer";
import FormHeading from "../../components/FormHeading";

const Landing = () => {

    const navigate = useNavigate();

    const onLogin = () => {
        navigate("/login")
    }

    const onRegister = () => {
        navigate("/register")
    }

    const onProceed = () => {
        navigate("/listings")
    }

    return (
        <FormContainer>
            <FormCard>
                <FormHeading>Find IT Namibia</FormHeading>
                <button
                    type="button"
                    className="btn btn-primary btn-block mx-0 mb-8"
                    onClick={onLogin}>
                    Login
                </button>
                <button
                    type="button"
                    className="btn btn-primary btn-block mx-0 mb-8"
                    onClick={onRegister}>
                    Register
                </button>
                <button
                    type="button"
                    className="btn btn-primary btn-block mx-0 mb-8"
                    onClick={onProceed}>
                    Proceed without account
                </button>
            </FormCard>
        </FormContainer>
    )
}
export default Landing