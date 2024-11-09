import { UserData } from "./userTypes";

export type userStatusType =
  | "Unwatched"
  | "Watching"
  | "Watched"
  | "Completed"
  | "On-Hold"
  | "Dropped"
  | "Plan to Watch";
export type listItemType = {
  id: number;
  name: string;
  title?: string;
  type: string;
};

export interface UserListProps {
  currentUser: UserData;
  userStatus?: userStatusType;
  userRating?: number;
  list?: string;
  item: listItemType;
}
