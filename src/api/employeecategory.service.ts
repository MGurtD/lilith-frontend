import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/api";

class EmployeeCategoryService {
  getAll() {
    return axios.get(API_URL + "/config/employeecategory");
  }
  update(employeecategory: any) {
    return axios.put(API_URL + "/config/employeecategory", employeecategory);
  }
  set(employeecategory: any) {
    return axios.post(API_URL + "/config/employeecategory", employeecategory);
  }
  delete(id: number) {
    return axios.delete(API_URL + "/config/employeecategory/" + id);
  }
}

export default new EmployeeCategoryService();
