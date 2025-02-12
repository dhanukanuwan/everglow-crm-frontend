import { ContactsListData } from "../../features/lib/types";
import { Link } from "react-router";

const ContactLists = ( {lists}: { lists: ContactsListData[]}) => {
    return(
        <div className="contacts-lists-wrap" style={{maxWidth: '1200px'}}>

            <h4>Customer Lists</h4>

            <div className="table-responsive">
                <table className="table table-striped table-light table-hover table-bordered">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">List Name</th>
                        <th scope="col">No. of Customers</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { lists.map( ( list, index ) => {
                            return(
                                <tr key={list.id}>
                                    <th scope="row">{index+1}</th>
                                    <td>{list.name}</td>
                                    <td>{list.uniqueSubscribers}</td>
                                    <td>
                                        <Link to={`/customers/lists/${list.id}`} className="btn btn-primary text-white py-1 px-3">
                                            <span className="me-2">Go to list</span>
                                            <span className="icon-right-thin"></span>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ContactLists;