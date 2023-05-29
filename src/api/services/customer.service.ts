import {
  Customer,
  CustomerContact,
  CustomerType,
  CustomerAddress,
} from "../../types";
import { logException } from "../api.client";
import BaseService from "../base.service";

export class CustomerTypeService extends BaseService<CustomerType> {}

export class CustomerService extends BaseService<Customer> {
  async addContact(model: CustomerContact): Promise<boolean> {
    let result: boolean = false;
    try {
      const response = await this.apiClient.post(
        `${this.resource}/Contact`,
        model
      );
      if (response.status === 200 || response.status === 201) {
        result = true;
      } else {
        //TODO: error on Toast
      }
    } catch (err) {
      logException(err);
    }
    return result;
  }

  async updateContact(model: CustomerContact): Promise<boolean> {
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

  async addAddress(model: CustomerAddress): Promise<boolean> {
    let result: boolean = false;
    try {
      const response = await this.apiClient.post(
        `${this.resource}/Address`,
        model
      );
      if (response.status === 200 || response.status === 201) {
        result = true;
      } else {
        //TODO: error on Toast
      }
    } catch (err) {
      logException(err);
    }
    return result;
  }

  async updateAddress(model: CustomerAddress): Promise<boolean> {
    let result: boolean = false;
    try {
      const response = await this.apiClient.put(
        `${this.resource}/Address/${model.id}`,
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

  async removeAddress(id: string): Promise<boolean> {
    let result: boolean = false;
    try {
      const response = await this.apiClient.delete(
        `${this.resource}/Address/${id}`
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
