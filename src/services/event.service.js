import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL +'/api'

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