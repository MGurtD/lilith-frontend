import axios from 'axios';
import getEnvironment from '@/env';

const API_URL = getEnvironment().apiBaseUrl + '/api';

class CategoryService {
    getAll(){
        return axios.get(API_URL + '/config/category');
    }
    update(category){
        return axios.put(API_URL + '/config/category', category)
    }
    set(category){
        return axios.post(API_URL + '/config/category', category)
    }
    delete(id){
        return axios.delete(API_URL + '/config/category/' + id)
    }
}

export default new CategoryService();