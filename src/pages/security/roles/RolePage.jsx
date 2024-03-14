import React  from 'react';
import RoleList from './components/RoleList';
import AppBreadcrumb from '../../../components/own/AppBreadcrumb';

const RolePage = () => {

    return (
        <div >
           <AppBreadcrumb meta={'Roles'} /> 
           <div className="layout-content">
             <RoleList />
           </div>
        </div>
    );
}
export default RolePage;
