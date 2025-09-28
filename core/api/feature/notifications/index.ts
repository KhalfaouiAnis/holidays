import { client } from "../../client";

export const fetchUserNotifications = async (
  options: PaginationParams,
  userId: string
): Promise<PagedResult<UserNotificationItem>> => {
  const { page, pageSize } = options;

  const { data } = await client.get(
    `/notifications/${userId}?page=${page}&pageSize=${pageSize}`
  );
  return data;
};

export const fetchNotifications = async (
  options: PaginationParams
): Promise<PagedResult<INotificationItem>> => {
  const { page, pageSize } = options;

  const { data } = await client.get(
    `/notifications?page=${page}&pageSize=${pageSize}`
  );
  return data;
};
