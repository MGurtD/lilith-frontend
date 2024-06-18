import { Workcenter } from "../types";
import serverClient from "../../../api/server.client";

export class RealtimeService {
  async GetWorkcenters(): Promise<Workcenter[] | undefined> {
    const endpoint = `/workcenter`;
    const response = await serverClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Workcenter[];
    }
  }

  async GetWorkcenter(id: string): Promise<Workcenter | undefined> {
    const endpoint = `/workcenter/${id}`;
    const response = await serverClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Workcenter;
    }
  }
}
