import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/api";


class EventStatusService{
    getAll(){
        return axios.get(API_URL + '/config/eventstatus')
    }    
}

export default new EventStatusService();