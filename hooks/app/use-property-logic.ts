import useProperty from "@/core/api/feature/properties/useProperty";
import useShoppingCartStore from "@/core/store";
import BottomSheet from "@gorhom/bottom-sheet";
import {
    fromDateId,
    toDateId,
    useDateRange,
} from "@marceloterreiro/flash-calendar";
import {
    addMonths,
    differenceInDays,
    isBefore,
    isSameMonth,
    startOfMonth,
    subMonths,
} from "date-fns";
import { useLocalSearchParams } from "expo-router";
import { nanoid } from "nanoid/non-secure";
import { useCallback, useMemo, useRef, useState } from "react";
import { useColorScheme } from "react-native";

export const usePropertyLogic = () => {
  const { id } = useLocalSearchParams();
  const { property, isLoading } = useProperty(id);
  const today = toDateId(new Date());
  const [calendarMonthId, setCalendarMonthId] = useState(today);
  const colorScheme = useColorScheme();
  const { addItem } = useShoppingCartStore();
  const { calendarActiveDateRanges, onCalendarDayPress } = useDateRange();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["70%"], []);

  // Memoize expand and close handlers
  const handleExpand = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const hasSelectedDates = Boolean(calendarActiveDateRanges[0]?.startId);

  const calculateDays = useCallback(() => {
    if (!calendarActiveDateRanges[0]) return 0;
    if (!calendarActiveDateRanges[0]?.startId) return 0;
    if (!calendarActiveDateRanges[0]?.endId) return 1;

    const startDate = new Date(calendarActiveDateRanges[0].startId);
    const endDate = new Date(calendarActiveDateRanges[0].endId);

    return differenceInDays(endDate, startDate) + 1;
  }, [calendarActiveDateRanges]);

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();

    if (
      !property ||
      !hasSelectedDates ||
      !calendarActiveDateRanges[0]?.startId
    ) {
      return;
    }

    const cartItem: ICartItem = {
      id: "cart" + nanoid(),
      image: property.images[1],
      name: property.name,
      product: property.id,
      price_per_night: property.price_per_night,
      quantity: 1,
      days: calculateDays(),
      startDate: calendarActiveDateRanges[0].startId,
      endDate:
        calendarActiveDateRanges[0].endId ??
        calendarActiveDateRanges[0].startId,
    };

    addItem(cartItem);
    bottomSheetRef.current?.close();
  }, [
    property,
    calendarActiveDateRanges,
    hasSelectedDates,
    calculateDays,
    addItem,
  ]);

  const handleCalendarDayPress = useCallback(
    (dateId: string) => {
      onCalendarDayPress(dateId);
    },
    [onCalendarDayPress]
  );

  const days = calculateDays();
  const totalPrice = property ? days * property.price_per_night : 0;

  const nextMonth = () => {
    const month = addMonths(calendarMonthId, 1);
    setCalendarMonthId(toDateId(month));
  };

  const currentDisplayMonth = fromDateId(calendarMonthId);

  const canGoBack =
    !isSameMonth(currentDisplayMonth, today) &&
    !isBefore(currentDisplayMonth, startOfMonth(today));

  const previousMonth = () => {
    if (canGoBack) {
      setCalendarMonthId(toDateId(subMonths(calendarMonthId, 1)));
    }
  };

  return {
    property,
    isLoading,
    colorScheme,
    snapPoints,
    totalPrice,
    bottomSheetRef,
    hasSelectedDates,
    canGoBack,
    calendarMonthId,
    calendarActiveDateRanges,
    today,
    days,
    previousMonth,
    nextMonth,
    handleCalendarDayPress,
    handleClose,
    handleExpand,
  };
};
