import BaseService from "../../../api/base.service";
import { GenericResponse } from "../../../types";
import { SupplierReference } from "../../purchase/types";
import { Reference, ReferenceFormat } from "../types";

export class ReferenceService extends BaseService<Reference> {
  async getByModule(
    module: string,
    category?: string
  ): Promise<Array<Reference> | undefined> {
    let endpoint = `${this.resource}/${module}`;
    if (category) {
      endpoint += `/${category}`;
    }
    const response = await this.apiClient.get(endpoint);
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

  async getReferenceSuppliers(referenceId: string) {
    const response = await this.apiClient.get(
      `${this.resource}/${referenceId}/Suppliers`
    );
    return response.data as Array<SupplierReference>;
  }
  async addSupplier(model: SupplierReference): Promise<boolean> {
    const response = await this.apiClient.post(`Supplier/Reference`, model);
    return response.status === 200 || response.status === 201;
  }
  async updateSupplier(model: SupplierReference): Promise<boolean> {
    const response = await this.apiClient.put(
      `Supplier/Reference/${model.id}`,
      model
    );
    return response.status === 200 || response.status === 201;
  }
  async removeSupplier(id: string): Promise<boolean> {
    const response = await this.apiClient.delete(`Supplier/Reference/${id}`);
    return response.status === 200 || response.status === 201;
  }
}
