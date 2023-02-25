import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/api";


class EventService{
    getAll(){
        return axios.get(API_URL + '/data/event')
    }
    getDetailedById(id: number){
        return axios.get(API_URL + '/data/event/detail/'+id)
    }
    set(event: any){
        return axios.post(API_URL + '/data/event', event)
    }
}

export default new EventService();