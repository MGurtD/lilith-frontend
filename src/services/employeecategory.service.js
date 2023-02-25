import axios from 'axios';
import getEnvironment from '@/env';

const API_URL = getEnvironment().apiBaseUrl + '/api';

class EmployeeCategoryService {
    getAll(){
        return axios.get(API_URL + '/config/employeecategory');
    }
    update(employeecategory){
        return axios.put(API_URL + '/config/employeecategory', employeecategory)
    }
    set(employeecategory){
        return axios.post(API_URL + '/config/employeecategory', employeecategory)
    }
    delete(id){
        return axios.delete(API_URL + '/config/employeecategory/' + id)
    }
}

export default new EmployeeCategoryService();