import { PRIMARY } from "@/core/theme/color";
import { useEffect, useMemo, useState } from "react";
import { getColors, ImageColorsResult } from "react-native-image-colors";

export const useImageColors = (imageUrl: string) => {
  const [colors, setColors] = useState<ImageColorsResult>();

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await getColors(imageUrl);
        setColors(response);
      } catch (error) {
        console.log({ error });
      }
    };
    fetchColors();
  }, [imageUrl]);

  const colorPalette = useMemo(() => {
    if (!colors)
      return {
        primary: PRIMARY,
        secondary: PRIMARY,
        background: PRIMARY,
      };

    if ("platform" in colors) {
      if (colors.platform === "ios") {
        return {
          primary: colors.primary,
          secondary: colors.secondary,
          background: colors.background,
        };
      } else if (colors.platform === "android") {
        return {
          primary: colors.dominant,
          secondary: colors.dominant,
          background: colors.vibrant,
        };
      }
    }
  }, [colors]);

  return {
    colors: colorPalette,
  };
};
