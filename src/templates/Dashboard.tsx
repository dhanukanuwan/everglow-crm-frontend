import SiteHeader from '../partials/header/SiteHeader';

const Dashboard = ({title}: {title: string}) => {

    return(
        <div className="content-wrap flex-grow-1">
            <SiteHeader title={title} />
        </div>
    );
}

export default Dashboard;