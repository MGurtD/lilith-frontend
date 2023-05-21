import { Supplier, SupplierContact, SupplierType } from "../../types";
import { logException } from "../api.client";
import BaseService from "../base.service";

export class SupplierService extends BaseService<Supplier> {
  async addContact(model: SupplierContact): Promise<boolean> {
    let result: boolean = false;
    try {
      const response = await this.apiClient.post(
        `${this.resource}/Contact`,
        model
      );
      if (response.status === 200 || response.status === 201) {
        result = true;
      } else {
        // TODO: Toast amb error
      }
    } catch (err) {
      logException(err);
    }
    return result;
  }

  async updateContact(model: SupplierContact): Promise<boolean> {
    let result: boolean = false;
    try {
      const response = await this.apiClient.put(
        `${this.resource}/Contact/${model.id}`,
        model
      );
      if (response.status === 200 || response.status === 201) {
        result = true;
      } else {
        // TODO: Toast amb error
      }
    } catch (err) {
      logException(err);
    }
    return result;
  }

  async removeContact(id: string): Promise<boolean> {
    let result: boolean = false;
    try {
      const response = await this.apiClient.delete(
        `${this.resource}/Contact/${id}`
      );
      if (response.status === 200 || response.status === 201) {
        result = true;
      } else {
        // TODO: Toast amb error
      }
    } catch (err) {
      logException(err);
    }
    return result;
  }
}
export class SupplierTypeService extends BaseService<SupplierType> {}
