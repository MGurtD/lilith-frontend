import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/api";

class CategoryService {
  getAll() {
    return axios.get(API_URL + "/config/category");
  }
  update(category: any) {
    return axios.put(API_URL + "/config/category", category);
  }
  set(category: any) {
    return axios.post(API_URL + "/config/category", category);
  }
  delete(id: number) {
    return axios.delete(API_URL + "/config/category/" + id);
  }
}

export default new CategoryService();
