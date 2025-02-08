import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router';
import logo from "../images/logo.png";
import { RootState } from "../features/lib/types";
import LoginForm from "../partials/LoginForm";

const ProtectedRoute = () => {

    const { userToken, tokenActive } = useSelector((state: RootState) => state.auth);

    if ( ! userToken && !tokenActive ) {
        return(
            <div className="login-wrap min-vh-100 min-vw-100 d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-5">
                        <div className="login-nner bg-white py-3 px-4 d-flex flex-column align-items-center">
                            <div className="d-flex align-items-center mb-4 mb-lg-5 mt-3">
                                <div className="logo-wrap pe-3">
                                    <img src={logo} alt="Logo" width={40} />
                                </div>
                                <h1 className="mb-0 h4">Everglow CRM</h1>
                            </div>

                            <LoginForm />

                        </div>

                    </div>
                </div>
            </div>
            
        </div>
        )
    }

    return <Outlet />;
}

export default ProtectedRoute;