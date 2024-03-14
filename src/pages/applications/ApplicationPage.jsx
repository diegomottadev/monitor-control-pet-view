import React  from 'react';
import ApplicationList from './components/ApplicationList';
import AppBreadcrumb from '../../components/own/AppBreadcrumb';


const ApplicationPage = () => {

    return (
        <div >
           <AppBreadcrumb meta={'Postulaciones'} /> 
           <div className="layout-content">
             <ApplicationList />
           </div>
        </div>
    );
}
export default ApplicationPage;
