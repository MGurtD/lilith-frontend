import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/api";

class ItemService {
  getAll() {
    return axios.get(API_URL + "/config/item");
  }
  update(item: any) {
    return axios.put(API_URL + "/config/item", item);
  }
  set(item: any) {
    return axios.post(API_URL + "/config/item", item);
  }
  delete(id: number) {
    return axios.delete(API_URL + "/config/item/" + id);
  }
}

export default new ItemService();
