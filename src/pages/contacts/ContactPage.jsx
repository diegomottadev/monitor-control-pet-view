import React  from 'react';
import ContactList from './components/ContactList';
import AppBreadcrumb from '../../components/own/AppBreadcrumb';


const ContactPage = () => {

    return (
        <div >
           <AppBreadcrumb meta={'Contactos'} /> 
           <div className="layout-content">
             <ContactList />
           </div>
        </div>
    );
}
export default ContactPage;
