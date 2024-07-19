import { FileService } from "./file.service";
import { UserFilterService } from "./userfilter.service";

export default {
  File: new FileService(),
  UserFilter: new UserFilterService(),
};
