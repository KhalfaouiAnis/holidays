import { PAGE_SIZE } from "@/core/api/common";

export const QUERY_DEBOUNCE_THRESHOLD = 500;
export const queryKeys = {
  FAVORITES: ["FAVORITES"],
  USER_PROFILE_STATS: ["USER_PROFILE_STATS"],
  BOOKINGS: ["bookings", PAGE_SIZE],
  PROPERTIES: ["properties", PAGE_SIZE],
  PROPERTIES_SEARCH: "PROPERTIES_SEARCH",
  PROPERTY: "PROPERTY",
  FEATURED_PROPERTIES: ["featured-properties", PAGE_SIZE],
};
