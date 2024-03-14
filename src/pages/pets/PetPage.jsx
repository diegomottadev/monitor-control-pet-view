import React  from 'react';
import PetList from './components/PetList';
import AppBreadcrumb from '../../components/own/AppBreadcrumb';


const PetPage = () => {

    return (
        <div >
           <AppBreadcrumb meta={'Pets'} /> 
           <div className="layout-content">
             <PetList />
           </div>
        </div>
    );
}
export default PetPage;
