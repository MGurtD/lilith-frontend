import BaseService from "../base.service";
import { UserMenuResponse } from "../../types/profile";
import { Profile } from "../../types";

export class ProfileService extends BaseService<any> {
  constructor() {
    super("Profile");
  }

  async GetUserMenu(userId: string): Promise<UserMenuResponse | undefined> {
    try {
      const response = await this.apiClient.get(
        `${this.resource}/user/${userId}/menu`
      );
      if (response.status === 200) return response.data as UserMenuResponse;
    } catch (err) {
      // Silent for now; upstream can fallback
    }
  }

  async GetAll(): Promise<Profile[] | undefined> {
    try {
      const response = await this.apiClient.get(this.resource);
      if (response.status === 200) return response.data as Profile[];
    } catch (err) {
      // ignore
    }
  }

  async SetUserProfile(userId: string, profileId: string): Promise<boolean> {
    try {
      const response = await this.apiClient.post(
        `${this.resource}/user/${userId}/profile`,
        { profileId }
      );
      return response.status === 204;
    } catch (err) {
      return false;
    }
  }
}

export const AppProfileService = new ProfileService();
