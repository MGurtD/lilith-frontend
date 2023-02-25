import axios from 'axios'
import getEnvironment from '@/env';

const API_URL = getEnvironment().apiBaseUrl + '/api';

class EventService{
    getAll(){
        return axios.get(API_URL + '/data/event')
    }
    getDetailedById(id){
        return axios.get(API_URL + '/data/event/detail/'+id)
    }
    set(event){
        return axios.post(API_URL + '/data/event', event)
    }
}

export default new EventService();