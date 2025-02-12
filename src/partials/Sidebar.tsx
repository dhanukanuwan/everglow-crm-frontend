import logo from "../images/logo.png";
import { Link, useLocation } from "react-router";

const Sidebar = () => {

    let { pathname } = useLocation();

    return(
        <div className="sidebar-wrap min-vh-100 bg-dark-bg" style={{width: '18.75rem'}}>
            <div className="d-flex align-items-center justify-content-center mb-4 mt-3">
                <div className="logo-wrap pe-3">
                    <img src={logo} alt="Logo" width={40} />
                </div>
                <span className="mb-0 h5 text-white">Everglow CRM</span>
            </div>
            <hr className="border-top" />

            <div className="menu-items-wrap mt-4">
                <nav>
                    <ul className="list-unstyled">
                        <li className={`menu-item mb-1 ${ pathname === '/' ? 'bg-white bg-opacity-25' : ''}`}>
                            <Link to={'/'} className="d-flex text-white text-decoration-none py-2 px-3">
                                <span className="icon-home"></span>
                                <span className="ms-2">Dashboard</span>
                            </Link>
                            
                        </li>
                        <li className={`menu-item mb-1 ${ pathname === '/customers' ? 'bg-white bg-opacity-25' : ''}`}>
                            <Link to={'/customers'} className="d-flex text-white text-decoration-none py-2 px-3">
                                <span className="icon-users"></span>
                                <span className="ms-2">Customers</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>
    );
}

export default Sidebar;