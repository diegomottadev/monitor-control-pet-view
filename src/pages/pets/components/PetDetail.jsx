import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import { petServiceInstance } from "../../../services/pets/PetService";
import { Tag } from "primereact/tag";

const PetDetail = ({ params }) => {
  const navigate = useNavigate();

  const { petId } = useParams(); // Update variable name
  const [pet, setPet] = useState(null); // Update state variable name


  const fetchApplication = useCallback(async () => {
    try {
      const { data: response } =
        await petServiceInstance.getPet(petId);
      setPet(response);

    } catch (error) {
      console.error(error);
    }
  }, [petId]);

  // Effects
  useEffect(() => {
    if (petId) {
      fetchApplication();
    }
  }, [petId, fetchApplication]);

  
  const getSizeTag = (size) => {
    switch (size) {
      case "small":
        return <Tag className="mr-2" value="Small" severity="info" />;
      case "medium":
        return <Tag className="mr-2" value="Medium" severity="warning" />;
      case "large":
        return <Tag className="mr-2" value="Large" severity="success" />;
      
      default:
        return null;
    }
  };
  
  const getGenderTag = (gender) => {
    switch (gender) {
      case "male":
        return <Tag className="mr-2" value="Male" severity="info" />;
      case "female":
        return <Tag className="mr-2" value="Female" severity="warning"  style={{ backgroundColor: "rgb(233, 30, 99)" }}/>;
    
      default:
        return null;
    }
  };

  const navigateToPets = () => {
    navigate("/pets");
  };

  return (
    <div className="layout-content">
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h5>Pet detail</h5>
            <div className="card">
              <div className="surface-0">
                <ul className="list-none p-0 m-0">
                  <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                    <div className="text-500 w-6 md:w-2 font-medium">Name</div>
                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                      {pet?.name}
                    </div>
                  </li>
                  <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                    <div className="text-500 w-6 md:w-2 font-medium">Especie</div>
                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                      {pet?.species}
                    </div>
                  </li>
                  <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                    <div className="text-500 w-6 md:w-2 font-medium">Breed</div>
                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                      {pet?.breed}
                    </div>
                  </li>
                  <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                    <div className="text-500 w-6 md:w-2 font-medium">Color</div>
                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                      {pet?.color}
                    </div>
                  </li>

                  <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                    <div className="text-500 w-6 md:w-2 font-medium">Size</div>
                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                      {getSizeTag(pet?.size)}
                    </div>
                  </li>
                  <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                    <div className="text-500 w-6 md:w-2 font-medium">Gender</div>
                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                      {getGenderTag(pet?.gender)}
                    </div>
                  </li>
                  <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                    <div className="text-500 w-6 md:w-2 font-medium">Weight</div>
                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                      {pet?.weight}
                    </div>
                  </li>
                  <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                    <div className="text-500 w-6 md:w-2 font-medium">Birthdate</div>
                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                      {pet?.birthdate}
                    </div>
                  </li>
                  <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                    <div className="text-500 w-6 md:w-2 font-medium">is Adopted?</div>
                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                      {pet?.isAdopted ?
                       <i className="pi pi-check-circle"></i>: <i className="pi pi-ban"></i> }
                    </div>
                  </li>
                 
                </ul>
              </div>
              <div className="flex justify-content-end mt-2">
                <div className="p-d-flex">
                  <Button
                    label="Volver"
                    icon="pi pi-arrow-circle-left"
                    className="p-button-raised p-button-secondary mr-2 mb-2"
                    onClick={navigateToPets}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
