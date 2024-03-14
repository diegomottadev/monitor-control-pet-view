import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import Error from '../../../components/Error';
import PetToolbar from './PetToolbar';
import { petServiceInstance } from '../../../services/pets/PetService';

const PetList = () => {
    // Refs
    const dt = useRef(null);
    const toast = useRef();

    // Hooks
    const navigate = useNavigate();
    const [pets, setPets] = useState(false);
    const [loadingDatatable, setLoadingDatatable] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [showError, setShowError] = useState(false);
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
        page: 0,
        search: null
    });
    // Functions
    const loadLazyData = useCallback(async () => {
        try {
            setLoadingDatatable(true);
            const { data: { data: result, count: total } } = await petServiceInstance.allPets(lazyParams);
            setTotalRecords(total);
            setPets(result);
            setLoadingDatatable(false);
        } catch (err) {
            console.error(err);
            console.warn('There was a problem loading the list of pets');
            setShowError(true);
            setLoadingDatatable(false);
        }
    }, [lazyParams, setLoadingDatatable, setTotalRecords, setPets, setShowError]);

    // Effects
    useEffect(() => {
        loadLazyData();
    }, [lazyParams,loadLazyData]);


    const onPage = (event) => {
        let _lazyParams = { ...lazyParams, ...event };
        setLazyParams(_lazyParams);
    };

    const onFilter = (e) => {
        const search = { search: { name: e.target.value } };
        let _lazyParams = { ...lazyParams, ...search };
        _lazyParams['first'] = 0;
        setLazyParams(_lazyParams);
    };

    const onEditPet = (petId) => {
        navigate(`/pets/${petId}/edit`);
    };


    const onViewPet = (petId) => {
        navigate(`/pets/${petId}`);
      };
    

    
    const onDeletePet = async (petId) => {
        try {
            const result = await Swal.fire({
                title: '',
                text: 'Do you confirm removing the pet permanently?',
                showCancelButton: true,
                confirmButtonText: `<i class="pi pi-check-circle"></i> Aceptar`,
                cancelButtonText: `<i class="pi pi-ban"></i> Cancelar`,
                confirmButtonColor: '#2196F3',
                cancelButtonColor: '#fbc02d',
            });

            if (result.isConfirmed) {
                const roleDelete = await petServiceInstance.deletePet(petId);
                toast.current.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: `${roleDelete.message}`,
                    life: 3000,
                });
                setLazyParams({ ...lazyParams, page: lazyParams.page });
            }
        } catch (error) {
            handleRequestError(error);
        }
    };

    const handleRequestError = (error) => {
        if (error.response) {
            console.error('Request error:', error.response.data);
            Swal.fire('Error', 'There was an error processing the request', 'error');
        } else if (error.request) {
            console.error('Response error:', error.request);
            Swal.fire('Error', 'No response received from the server', 'error');
        } else {
            console.error('Error:', error.message);
            Swal.fire('Error', 'An error occurred while making the request', 'error');
        }
    };
    

    
    // Templates
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">&nbsp;</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => onFilter(e)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                     <Button
                        tooltip={"Ver"}
                        tooltipOptions={{ position: "top" }}
                        icon="pi pi-eye"
                        className="p-button-raised p-button-info p-mr-2"
                        onClick={() => onViewPet(rowData.id)}
                    />
                <Button tooltip={"Editar"} tooltipOptions={{ position: 'top' }} icon="pi pi-pencil" className="p-button-raised p-button-success p-mr-2" onClick={() => onEditPet(rowData.id)} />
                <Button tooltip={"Eliminar"} tooltipOptions={{ position: 'top' }} icon="pi pi-trash" className="p-button-raised p-button-danger p-mr-2" onClick={() => onDeletePet(rowData.id)} />
            </div>
        );
    }

    // Render
    if (showError) {
        return (
            <Error mensaje={'There was a problem loading the list of pets'}></Error>
        );
    }

    return (
        <div>
            <PetToolbar params={lazyParams.search} />
            <div className="grid">
                <div className="col-12">
                    <div className="card">
                        <h5>Contactos</h5>
                        <Toast ref={toast} />
                        <DataTable ref={dt} value={pets} lazy
                            paginator first={lazyParams.first} rows={10} totalRecords={totalRecords} onPage={onPage}
                            loading={loadingDatatable}
                            className="p-datatable-gridlines" header={header}
                        >
                            <Column field="name" header="Name" headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                            <Column field="breed" header="Breed" ></Column>
                            <Column field="birthdate" header="Birthdate" ></Column>
                            <Column field="size" header="Size" ></Column>
                            <Column field="weight" header="Weight" ></Column>
                            <Column field="gender" header="Gender" ></Column>
                            <Column field="color" header="Color" ></Column>
                            
                            <Column body={actionBodyTemplate}></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetList;
