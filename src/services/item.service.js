import axios from 'axios';

const API_URL = 'http://localhost:8085/api';

class ItemService {
    getAll(){
        return axios.get(API_URL + '/config/item');
    }
    update(item){
        return axios.put(API_URL + '/config/item', item)
    }
    set(item){
        return axios.post(API_URL + '/config/item', item)
    }
    delete(id){
        return axios.delete(API_URL + '/config/item/'+id)
    }
}

export default new ItemService();