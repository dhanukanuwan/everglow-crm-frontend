import { useEffect, useState, FormEvent } from "react";
import logo from "../images/logo.png";
import { LoginFormValues, RootState, LoginCreds } from "../features/lib/types";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../features/auth/authActions";
import { AppDispatch } from "../features/lib/store";
import { useNavigate } from 'react-router';

const Login = () => {

    const defaultFormValues: LoginFormValues = {
        user_email: '',
        user_password: '',
        user_remember: false
    }

    const dispatch = useDispatch<AppDispatch>();
    const { loading, userToken, error, success } = useSelector( (state: RootState) => state.auth );

    const [formValues, setFormValues] = useState( defaultFormValues );

    const navigate = useNavigate();

    useEffect(() => {

        if (userToken) navigate('/')

    }, [navigate, userToken])

    const handleInputUpdate = ( key: string, value: string | boolean ) => {
        setFormValues( { ...formValues, [key]: value })
    }

    const handleFormSubmit = async ( event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const userLoginData: LoginCreds = {
            email: formValues.user_email,
            password: formValues.user_password
        }

        dispatch( loginUser( userLoginData ) );
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

                                { error &&
                                    <div className="alert alert-danger rounded-0" role="alert">
                                        Login error!!. Please check your email address and password.
                                    </div>
                                }

                                { !loading && success &&
                                    <div className="alert alert-success rounded-0" role="alert">
                                        Successfully logged in.
                                    </div>
                                }

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
                                    <button type="submit" className="btn btn-secondary w-100" disabled={loading}>
                                        { (loading || success ) ? (
                                            <span className="icon-circle-notch animate-spin"></span>
                                        ) : (
                                            <span className="icon-login"></span>
                                        )}
                                        
                                        <span className="ps-2">{ success ? 'Redirecting...' : 'Login'}</span>
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