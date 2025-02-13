import { useEffect, useState } from "react";
import { RootState, ContactsListData } from "../../features/lib/types";
import { useSelector } from 'react-redux';
import { useParams } from "react-router";

const SingleListName = () => {

    const { contactsLists } = useSelector( (state: RootState) => state.contacts );
    const { viewID } = useParams();
    const [listName, setListName] = useState<string>('');

    useEffect(() => {

        if ( ! viewID ) return;

        if ( !contactsLists.lists || ( contactsLists.lists && contactsLists.lists.length === 0 )) return;

        const listID = parseInt( viewID, 10 );

        const listKey = contactsLists.lists.findIndex( (item: ContactsListData) => item.id === listID );

        if ( listKey !== -1 ) {
            setListName( contactsLists.lists[listKey].name );
        }

    }, [contactsLists, viewID]);

    return(
        <>
            { listName && <h3>{listName}</h3>}
        </>
    )

}

export default SingleListName;