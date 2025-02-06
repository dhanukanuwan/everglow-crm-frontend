import { useState, FormEvent } from "react";
import logo from "../images/logo.png";
import { LoginFormValues } from "../features/lib/types";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../features/auth/authActions";

const Login = () => {

    const defaultFormValues: LoginFormValues = {
        user_email: '',
        user_password: '',
        user_remember: false
    }

    const [formValues, setFormValues] = useState( defaultFormValues );

    const handleInputUpdate = ( key: string, value: string | boolean ) => {
        setFormValues( { ...formValues, [key]: value })
    }

    const handleFormSubmit = async ( event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
    }

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

                            <form className="w-100" onSubmit={( event ) => handleFormSubmit( event )}>

                                <div className="mb-3">
                                    <label htmlFor="user_email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="user_email" value={formValues.user_email} onChange={(e) => handleInputUpdate( 'user_email', e.target.value )} placeholder="Please enter your email here..." />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="user_password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="user_password" value={formValues.user_password} onChange={(e) => handleInputUpdate( 'user_password', e.target.value )} placeholder="Please enter your password here..." />
                                </div>
                                <div className="mb-3">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="user_remember" checked={formValues.user_remember} onChange={(e) => handleInputUpdate( 'user_remember', !formValues.user_remember )} />
                                        <label className="form-check-label" htmlFor="user_remember">Remember me</label>
                                    </div>
                                </div>
                                <div className="mb-3 pt-3">
                                    <button type="submit" className="btn btn-secondary w-100">
                                        <span className="icon-login pe-2"></span>
                                        <span>Login</span>
                                    </button>
                                </div>

                            </form>

                        </div>

                    </div>
                </div>
            </div>
            
        </div>
    )

}

export default Login;