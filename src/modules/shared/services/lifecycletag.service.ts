import BaseService from "../../../api/base.service";
import { LifecycleTag } from "../../../modules/shared/types";
import { Status } from "../../../modules/shared/types";

export class LifecycleTagService extends BaseService<LifecycleTag> {
  async getByLifecycleId(
    lifecycleId: string
  ): Promise<LifecycleTag[] | undefined> {
    try {
      const response = await this.apiClient.get(
        `${this.resource}/Lifecycle/${lifecycleId}`
      );
      if (response.status === 200) {
        return response.data as LifecycleTag[];
      }
    } catch (err) {
      console.error("Error getting lifecycle tags:", err);
    }
  }

  async getByStatusId(statusId: string): Promise<LifecycleTag[] | undefined> {
    try {
      const response = await this.apiClient.get(
        `${this.resource}/Status/${statusId}`
      );
      if (response.status === 200) {
        return response.data as LifecycleTag[];
      }
    } catch (err) {
      console.error("Error getting tags by status:", err);
    }
  }

  async createForLifecycle(
    lifecycleId: string,
    tag: LifecycleTag
  ): Promise<boolean> {
    try {
      const response = await this.apiClient.post(
        `${this.resource}/Lifecycle/${lifecycleId}`,
        tag
      );
      return response.status === 201;
    } catch (err) {
      console.error("Error creating lifecycle tag:", err);
      return false;
    }
  }

  async assignToStatus(statusId: string, tagId: string): Promise<boolean> {
    try {
      const response = await this.apiClient.post(
        `${this.resource}/Status/${statusId}/AssignTag/${tagId}`
      );
      return response.status === 200;
    } catch (err) {
      console.error("Error assigning tag to status:", err);
      return false;
    }
  }

  async removeFromStatus(statusId: string, tagId: string): Promise<boolean> {
    try {
      const response = await this.apiClient.delete(
        `${this.resource}/Status/${statusId}/RemoveTag/${tagId}`
      );
      return response.status === 200;
    } catch (err) {
      console.error("Error removing tag from status:", err);
      return false;
    }
  }

  async getStatusesByTag(tagId: string): Promise<Status[] | undefined> {
    try {
      const response = await this.apiClient.get(
        `${this.resource}/Tag/${tagId}/Statuses`
      );
      if (response.status === 200) {
        return response.data as Status[];
      }
    } catch (err) {
      console.error("Error getting statuses by tag:", err);
    }
  }
}
