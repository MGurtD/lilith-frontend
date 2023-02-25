import axios from 'axios';
import getEnvironment from '@/env';

const API_URL = getEnvironment().apiBaseUrl + '/api';

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