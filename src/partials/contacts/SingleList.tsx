import { Link } from "react-router";

const SingleList = () => {
    return(
        <div className="contact-list-wrap">

            <div className="mb-4">
                <Link to="/customers">
                    <span className="icon-left-thin"></span>
                    <span className="ms-2">Go back</span>
                </Link>
            </div>

            <h4>List Contacts</h4>
        </div>
    )
}

export default SingleList;