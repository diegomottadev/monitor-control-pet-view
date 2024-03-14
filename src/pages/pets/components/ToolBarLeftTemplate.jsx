import { Button } from "primereact/button";

const ToolbarLeftTemplate = ({OnNew}) => {
    return (
        <>
            <Button label="Nuevo" icon="pi pi-plus-circle" style={{ marginRight: '.5em' }} onClick={OnNew} />
        </>
    );
};
export default ToolbarLeftTemplate;