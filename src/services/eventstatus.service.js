import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL + '/api';

class EventStatusService {
    getAll(){
        return axios.get(API_URL + '/config/eventstatus');
    }
    update(eventstatus){
        return axios.put(API_URL + '/config/eventstatus', eventstatus)
    }
    set(eventstatus){
        return axios.post(API_URL + '/config/eventstatus', eventstatus)
    }
    delete(id){
        return axios.delete(API_URL + '/config/eventstatus/'+id)
    }
}

export default new EventStatusService();