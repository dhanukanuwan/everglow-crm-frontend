import { Link } from "react-router";
import logo from "../images/logo.png";

const NotFound = () => {

    return (
        <div className="404-wrap min-vh-100 min-vw-100 d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-6 d-flex flex-column align-items-center text-center">
                        
                        <div className="d-flex align-items-center mb-4 mb-lg-5 mt-3">
                            <div className="logo-wrap pe-3">
                                <img src={logo} alt="Logo" width={40} />
                            </div>
                            <span className="mb-0 h4">Everglow CRM</span>

                        </div>

                        <h1 className="display-1">404</h1>
                        <span className="h3">Sorry, the page you are looking for could not be found.</span>
                        <div className="mt-4">
                            <Link to="/" className="btn btn-primary px-4 px-lg-5 text-white">
                                <span className="me-2">Back to Home</span>
                                <span className="icon-right-thin"></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default NotFound;