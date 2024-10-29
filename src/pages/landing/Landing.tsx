import { Link } from "react-router-dom"
import FormCard from "../../components/FormCard";
import FormContainer from "../../components/FormContainer";
import FormHeading from "../../components/FormHeading";

const Landing = () => {

    return (
        <FormContainer>
            <FormCard>
                <FormHeading>Find IT Namibia</FormHeading>
                <Link to="/login" className="btn btn-primary btn-block mx-0 mb-8" >
                    Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-block mx-0 mb-8" >
                    Register
                </Link>
                <Link to="/home" className="btn btn-primary btn-block mx-0 mb-8">
                    Proceed without account
                </Link>
            </FormCard>
        </FormContainer>
    )
}
export default Landing