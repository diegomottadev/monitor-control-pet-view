import { Button } from "primereact/button";

const ToolbarRightTemplate = ({onExport}) => {
    return (
        <>
            <Button label="Exportar" icon="pi pi-file-excel" className="p-button-secondary" onClick={onExport} />
        </>
    );
};

export default ToolbarRightTemplate