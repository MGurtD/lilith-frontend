import BaseService from "../../../api/base.service";
import { GenericResponse } from "../../../types";
import { Reference, ReferenceFormat } from "../types";

export class ReferenceService extends BaseService<Reference> {
  async getByModule(module: string): Promise<Array<Reference> | undefined> {
    const response = await this.apiClient.get(`${this.resource}/${module}`);
    if (response.status === 200) {
      return response.data as Array<Reference>;
    }
  }
  async getSalesReferencesByCustomer(
    customerId: string
  ): Promise<Array<Reference> | undefined> {
    const response = await this.apiClient.get(
      `${this.resource}/sales/customer/${customerId}`
    );
    if (response.status === 200) {
      return response.data as Array<Reference>;
    }
  }
  async getReferenceFormats(): Promise<Array<ReferenceFormat> | undefined> {
    const response = await this.apiClient.get(`${this.resource}/Formats`);
    if (response.status === 200) {
      return response.data as Array<ReferenceFormat>;
    }
  }
  async deleteReference(id: string): Promise<GenericResponse<Reference>> {
    const response = await this.apiClient.delete(`${this.resource}/${id}`);
    if (response.status === 200) {
      return {
        result: true,
        errors: [],
        content: response.data as Reference,
      };
    } else {
      const errorMessage = response.data
        ? response.data.toString()
        : "Error desconegut";
      return {
        result: false,
        errors: [errorMessage],
        content: null,
      };
    }
  }
}
