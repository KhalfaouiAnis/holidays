import { client } from "../../client";

export const listProperties = async (
  options: PaginationParams
): Promise<PagedResult<Property>> => {
  const { page, pageSize } = options;

  const { data } = await client.get(
    `/properties?page=${page}&pageSize=${pageSize}`
  );
  return data;
};

export const listFeaturedProperties = async (
  options: PaginationParams
): Promise<PagedResult<Property>> => {
  const { page, pageSize } = options;

  const { data } = await client.get(
    `/properties/featured?page=${page}&pageSize=${pageSize}`
  );

  return data;
};
