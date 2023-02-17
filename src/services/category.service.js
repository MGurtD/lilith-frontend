import axios from 'axios';

const API_URL = 'http://localhost:8085/api';

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