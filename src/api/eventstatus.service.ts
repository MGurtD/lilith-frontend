import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/api";

class EventStatusService {
  getAll() {
    return axios.get(API_URL + "/config/eventstatus");
  }
  update(eventstatus: any) {
    return axios.put(API_URL + "/config/eventstatus", eventstatus);
  }
  set(eventstatus: any) {
    return axios.post(API_URL + "/config/eventstatus", eventstatus);
  }
  delete(id: number) {
    return axios.delete(API_URL + "/config/eventstatus/" + id);
  }
}

export default new EventStatusService();
