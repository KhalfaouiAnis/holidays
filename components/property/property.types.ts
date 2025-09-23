import { Ionicons } from "@expo/vector-icons";

export type AmenityType =
  | "WiFi"
  | "Kitchen"
  | "Pool"
  | "Air conditioning"
  | "Pet friendly"
  | "Free parking";

export const amenityIcon: Record<AmenityType, keyof typeof Ionicons.glyphMap> = {
  "Air conditioning": "snow",
  "Pet friendly": "paw",
  Kitchen: "restaurant",
  Pool: "water",
  WiFi: "wifi",
  "Free parking": "car",
};

export type AmenitiesListProps = {
  amenitites: string;
};

export type PropertyImageProps = {
    imageUrl: string,
    rating?: number,
    isFavorite: boolean
};