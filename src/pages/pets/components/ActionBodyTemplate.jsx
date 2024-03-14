import { Button } from "primereact/button";

const ActionBodyTemplate = ({ rowData, onViewPet, onEditPet, onDeletePet }) => {
    return (
        <div className="actions">
            <Button
                tooltip="Ver"
                tooltipOptions={{ position: "top" }}
                icon="pi pi-eye"
                className="p-button-raised p-button-info p-mr-2"
                onClick={() => onViewPet(rowData.id)}
            />
            <Button
                tooltip="Editar"
                tooltipOptions={{ position: 'top' }}
                icon="pi pi-pencil"
                className="p-button-raised p-button-success p-mr-2"
                onClick={() => onEditPet(rowData.id)}
            />
            <Button
                tooltip="Eliminar"
                tooltipOptions={{ position: 'top' }}
                icon="pi pi-trash"
                className="p-button-raised p-button-danger p-mr-2"
                onClick={() => onDeletePet(rowData.id)}
            />
        </div>
    );
};

export default ActionBodyTemplate;
