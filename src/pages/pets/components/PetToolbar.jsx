
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { saveAs } from 'file-saver';
import { petServiceInstance } from "../../../services/pets/PetService";
import ToolbarLeftTemplate from './ToolBarLeftTemplate';
import ToolbarRightTemplate from './ToolbarRigthTemplate';

const PetToolbar = ({params}) => {

    const navigate = useNavigate();

    const navigateToPetNewForm = () => {
        navigate('/pets/new');
    };

    const onExportToExcel = async () => {
        const url = await petServiceInstance.exportPets(params);
        const filename = 'pets.xlsx'; // Nombre del archivo
        saveAs(url, filename); // Guardar el archivo en una ubicación específica
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toolbar 
                            left={<ToolbarLeftTemplate onNew={navigateToPetNewForm}/>} 
                            right={<ToolbarRightTemplate onExport={onExportToExcel}/> }>
                    </Toolbar>
                </div>
            </div>
        </div>
    );
   
}

export default PetToolbar;