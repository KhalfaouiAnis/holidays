import { client } from "../../client";

export const listBookings = async (
  options: PaginationParams
): Promise<PagedResult<Booking>> => {
  const { page, pageSize } = options;

  const { data } = await client.get(
    `/users/bookings?page=${page}&pageSize=${pageSize}`
  );
  return data;
};
