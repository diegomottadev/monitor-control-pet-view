import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import AppBreadcrumb from "../../../components/own/AppBreadcrumb";
import { useCallback } from "react";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { petServiceInstance } from "../../../services/pets/PetService";

export const PetForm = () => {
  // Refs
  const toast = useRef();

  // Hooks
  const navigate = useNavigate();
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [name, setName] = useState(null);
  const [species, setSpecies] = useState(null);
  const [breed, setBreed] = useState(null);
  const [birthdate, setBirthdate] = useState(null);
  const [size, setSize] = useState(null);
  const [gender, setGender] = useState(null);
  const [color, setColor] = useState(null);
  const [description, setDescription] = useState(null);
  const [weight, setWeight] = useState(null);
  const [isAdopted, setIsAdopted] = useState(false);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isSpeciesValid, setIsSpeciesValid] = useState(true);
  const [isBreedValid, setIsBreedValid] = useState(true);
  const [isBirthdateValid, setIsBirthdateValid] = useState(true);
  const [isSizeValid, setIsSizeValid] = useState(true);
  const [isGenderValid, setIsGenderValid] = useState(true);
  const [isColorValid, setIsColorValid] = useState(true);
  const [isWeightValid, setIsWeightValid] = useState(true);

  const validateFields = () => {
    setIsNameValid(!!name);
    setIsSpeciesValid(!!species);
    setIsBreedValid(!!breed);
    setIsBirthdateValid(!!birthdate);
    setIsSizeValid(!!size);
    setIsGenderValid(!!gender);
    setIsColorValid(!!color);
    setIsWeightValid(!!weight);
    // Add more validations for other fields if needed
  };


  const parseDateString = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`);
  };
  const fetchPet = useCallback(async () => {
    try {
      const { data: response } = await petServiceInstance.getPet(petId);
      setPet(response);
      setName(response.name);
      setSpecies(response.species);
      setBreed(response.breed);
      setBirthdate(parseDateString(response.birthdate));
      setSize(response.size);
      setGender(response.gender);
      setColor(response.color);
      setDescription(response.description);
      setWeight(response.weight);
      setIsAdopted(response.isAdopted);
    } catch (error) {
      console.error(error);
    }
  }, [petId]);

  // Options for Size dropdown
  const sizeOptions = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' }
  ];

  // Options for Gender dropdown
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ];


  // Effects
  useEffect(() => {
    if (petId) {
      fetchPet();
    }
  }, [petId, fetchPet]);





  const handleSubmit = async (event) => {
    event.preventDefault();


    validateFields()

    if (!name || !species || !size || !gender || !breed || !birthdate || !color || !weight) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please fill out all required fields",
        life: 3000,
      });
      return;
    }

    const data = {
      name,
      species,
      breed,
      birthdate,
      size,
      gender,
      color,
      description,
      weight,
      isAdopted,
    };

    try {
      let response;
      if (pet) {
        response = await petServiceInstance.updatePet(pet.id, data);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: `Pet ${name} updated`,
          life: 3000,
        });
      } else {
        await petServiceInstance.createPet(data);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: `Pet ${name} created`,
          life: 3000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const goBackPetList = () => {
    navigate("/pets");
  };

  // Render
  return (
    <div>
      <AppBreadcrumb meta={petId ? "Pets / Edit" : "Pets / New"} />
      <div className="layout-content">
        <Toast ref={toast} onHide={() => navigate("/pets")} />
        <div className="grid">
          <div className="col-12">
            <div className="card">
              <h5>{petId ? "Edit Pet" : "New Pet"}</h5>
              <form onSubmit={handleSubmit}>
                <div className="card p-fluid">
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <InputText
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={!isNameValid && 'p-invalid'}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="species">Species</label>
                    <InputText
                      id="species"
                      type="text"
                      value={species}
                      onChange={(e) => setSpecies(e.target.value)}
                      className={!isSpeciesValid && 'p-invalid'}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="breed">Breed</label>
                    <InputText
                      id="breed"
                      type="text"
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      className={!isBreedValid && 'p-invalid'}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="birthdate">Birthdate</label>
                      <Calendar
                        showIcon
                        showButtonBar
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        className={!isBirthdateValid && 'p-invalid'}
                      ></Calendar>

                  </div>
                  <div className="field">
                    <label htmlFor="size">Size</label>
                    <Dropdown
                      id="size"
                      value={size}
                      onChange={(e) => setSize(e.value)}
                      options={sizeOptions}
                      placeholder="-- Select size --"
                      className={!isSizeValid && 'p-invalid'}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="gender">Gender</label>
                    <Dropdown
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.value)}
                      options={genderOptions}
                      placeholder="-- Select gender --"
                      className={!isGenderValid && 'p-invalid'}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="color">Color</label>
                    <InputText
                      id="color"
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className={!isColorValid && 'p-invalid'}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="description">Description</label>
                    <InputText
                      id="description"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="weight">Weight</label>
                    <InputText
                      id="weight"
                      type="text"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className={!isWeightValid && 'p-invalid'}
                    />
                  </div>
                  <div className="field-checkbox">
                   <Checkbox
                      id="isAdopted"
                      inputId="isAdopted"
                      checked={isAdopted}
                      onChange={(e) => setIsAdopted(e.checked)}
                    />
                    <label htmlFor="isAdopted">Is Adopted?</label>
                    
                  </div>
                </div>

                <div className="flex justify-content-end mt-2">
                  <div className="p-d-flex">
                    <Button
                      label="Back"
                      icon="pi pi-arrow-circle-left"
                      className="p-button-raised p-button-secondary mr-2 mb-2"
                      onClick={goBackPetList}
                    />
                  </div>
                  <div className="p-d-flex">
                    <Button
                      type="submit"
                      label={pet ? "Update" : "Save"}
                      icon="pi pi-save"
                      className="p-button-raised p-button-success"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetForm;
