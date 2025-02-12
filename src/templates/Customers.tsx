import SiteHeader from '../partials/header/SiteHeader';
import { useEffect } from "react";
import { RootState } from "../features/lib/types";
import { useDispatch, useSelector } from 'react-redux';
import { getContactsLists } from '../features/contacts/contactsActions';
import { AppDispatch } from "../features/lib/store";
import ContactLists from '../partials/contacts/ContactsLists';
import { useParams } from "react-router";
import SingleList from '../partials/contacts/SingleList';

const Customers = ({title}: {title: string}) => {

    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, contactsLists } = useSelector( (state: RootState) => state.contacts );
    const { customersView, viewID } = useParams();

    useEffect(() => {

        if ( contactsLists.lists ) return;

        const userLoginData: {limit: number, offset: number} = {
            limit: 10,
            offset: 0
        }

        dispatch( getContactsLists( userLoginData ) );

    }, [dispatch, contactsLists]);

    return(
        <div className="content-wrap flex-grow-1">
            <SiteHeader title={title} />

            <div className="px-3 mt-4 mt-lg-5">

                { loading ? (
                    <div className="spinner-border text-dark-text" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <>
                        { error &&
                            <div className="alert alert-danger rounded-0" role="alert">
                                Error retrieving contacts. Please try again later.
                            </div>
                        }

                        { ( contactsLists && contactsLists.lists && contactsLists.count > 0 ) ? (
                            <>
                                {  ( customersView === 'lists' && viewID ) ? (<SingleList />) : (<ContactLists lists={contactsLists.lists} />)}
                                
                            </>
                        ) : (
                            <div className="alert alert-secondary" role="alert">
                                No contacts lists to display.
                            </div>
                        ) }
                    </>
                )}

            </div>

        </div>
    )
}

export default Customers;