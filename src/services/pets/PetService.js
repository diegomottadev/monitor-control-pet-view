
import axios from 'axios';
import { BASE_URL } from '../../helpers/BaseUrl';

const PET_API_BASE_URL = `${BASE_URL}/pets`;

class PetService {

    createPet = (user) => {
        return axios.post(PET_API_BASE_URL, user);
    };


    getPet = (petId) => {
        return axios.get(`${PET_API_BASE_URL}/${petId}`);
    };

    updatePet = async (petId, body) => {
        const response = await axios.put(`${PET_API_BASE_URL}/${petId}`, body);
        return response.data;
    };

    deletePet = async (petId) => {
        const response = await axios.delete(`${PET_API_BASE_URL}/${petId}`);
        return response.data;
    };

    allPets = async (params) => {
        let url = `${PET_API_BASE_URL}?page=${params.page+1}`
        
        if(params && params.search){
            url = `${PET_API_BASE_URL}?page=${params.page+1}`;
        }
       
       if(params && params.search!==null){
           let keys = Object.keys(params.search);
           url = `${PET_API_BASE_URL}?page=${1}&${keys[0]}=${params.search.name}`;
       }
       console.log(url)
       return await axios.get(url);
    }

    exportPets= async (params) => {

        let url = `${PET_API_BASE_URL}/export`;
        if(params!==null){
            let keys = Object.keys(params);
            url = `${PET_API_BASE_URL}/export?${keys[0]}=${params.name}`;
        }
        const response = await axios.get(url, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
        const urlObject= URL.createObjectURL(blob);
        return urlObject;

      }
}

const petServiceInstance = new PetService(); // Creamos una instancia de PetService y la asignamos a una variable

export { petServiceInstance };  // Exportamos la variable que contiene la instancia de PetService