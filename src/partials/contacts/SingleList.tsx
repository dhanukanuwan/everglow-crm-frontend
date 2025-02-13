import { Link } from "react-router";
import { useEffect, useState } from "react";
import { RootState, ListContactsType } from "../../features/lib/types";
import { useDispatch, useSelector } from 'react-redux';
import { getListContacts } from '../../features/contacts/contactsActions';
import { AppDispatch } from "../../features/lib/store";
import { useParams } from "react-router";
import { encode } from 'js-base64';
import SingleListName from "./SingleListName";

const SingleList = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { listContacts, listContactsError } = useSelector( (state: RootState) => state.contacts );
    const { viewID, pageNumber } = useParams();
    const [listContactsKey, setListContactsKey] = useState<number>(0);

    const offsetNumber = pageNumber ? parseInt( pageNumber, 10 ) : 0;

    useEffect(() => {

        if ( ! viewID ) return;

        const listID = parseInt( viewID, 10 );
        let offset = 0;
        const limit = 50;

        if ( pageNumber && parseInt( pageNumber, 10 ) > 0 ) {
            offset = parseInt( pageNumber, 10 );
        }

        if ( listContacts && listContacts.length > 0 ) {

            const base64key = encode( `${listID}-${offset}-${limit}` );

            const contactsCachedKey = listContacts.findIndex( (item: ListContactsType) => item.key === base64key );

            if ( contactsCachedKey !== -1 ) {
                setListContactsKey( contactsCachedKey );
                return;
            }

        }

        const listQueryParams: {limit: number, offset: number, listID: number} = {
            limit: limit,
            offset: offset,
            listID: listID
        }

        dispatch( getListContacts( listQueryParams ) );

    }, [dispatch, viewID, listContacts, pageNumber]);

    return(
        <div className="contact-list-wrap px-lg-3">

            <div className="mb-4">
                <Link to="/customers">
                    <span className="icon-left-thin"></span>
                    <span className="ms-2">Go back</span>
                </Link>
            </div>

            { listContactsError &&
                <div className="alert alert-danger rounded-0" role="alert">
                    Error retrieving list contacts. Please try again later.
                </div>
            }

            <SingleListName />

            <div className="contacts-lists-wrap mb-4 mb-lg-5" style={{maxWidth: '1200px'}}>

                { listContacts[listContactsKey].count > 0 ? (
                    <>
                        <div className="d-flex justify-content-end mb-3">

                            { offsetNumber > 0 &&
                                <Link to={`/customers/lists/${viewID}/${offsetNumber === 1 ? '' : offsetNumber - 1}`} className="btn btn-secondary btn-sm px-3 rounded-0 me-2">
                                    <span className="icon-left-thin"></span>
                                    <span className="ms-2">Previous</span>
                                    
                                </Link>
                            }

                            <Link to={`/customers/lists/${viewID}/${offsetNumber+1}`} className="btn btn-secondary btn-sm px-3 rounded-0">
                                <span className="me-2">Next</span>
                                <span className="icon-right-thin"></span>
                            </Link>
                        </div>

                        <div className="table-responsive" >
                            <table className="table table-striped table-light table-hover table-bordered d-block overflow-x-auto" style={{whiteSpace: 'nowrap'}}>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">1<sup>st</sup> Line Address</th>
                                        <th scope="col">2<sup>nd</sup> Line Address</th>
                                        <th scope="col">Town</th>
                                        <th scope="col">County</th>
                                        <th scope="col">Postcode</th>
                                        <th scope="col">Work Carried Out</th>
                                        <th scope="col">Amount Paid</th>
                                        <th scope="col">Customer Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { listContacts[listContactsKey].contacts.map( ( contact: {[key: string]: any}, index: number ) => {
                                        return(
                                            <tr key={contact.id}>
                                                <th scope="row">{( 50*offsetNumber) + (index+1)}</th>
                                                <td>
                                                    <Link to={`/customers/index/${contact.id}`} className="text-dark-text">{`${contact.attributes.FIRSTNAME || ''} ${contact.attributes.LASTNAME || ''}`}</Link>
                                                </td>
                                                <td>{contact.attributes.DATE || ''}</td>
                                                <td>{contact.attributes.FIRSTLINEADDRESS || ''}</td>
                                                <td>{contact.attributes.SECONDLINEADDRESS || ''}</td>
                                                <td>{contact.attributes.TOWN || ''}</td>
                                                <td>{contact.attributes.COUNTY || ''}</td>
                                                <td>{contact.attributes.POSTCODE || ''}</td>
                                                <td>{contact.attributes.WORKCARRIEDOUT || ''}</td>
                                                <td>{contact.attributes.AMOUNT_PAID || ''}</td>
                                                <td>{contact.attributes.CUSTOMER_TYPE || ''}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <div className="alert alert-secondary" role="alert">
                        This list has no contacts to display.
                    </div>
                )}

                
            </div>
        </div>
    )
}

export default SingleList;