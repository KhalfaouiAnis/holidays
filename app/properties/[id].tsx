import { Container, Header, LoadingIndicator, Text } from '@/components';
import AmenitiesList from '@/components/property/amenities-list';
import PropertyImage from '@/components/property/property-image';
import { client } from '@/core/api/client';
import useShoppingCartStore from '@/core/store';
import { calendarTheme } from '@/core/theme/calendar-theme';
import { PRIMARY } from '@/core/theme/color';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { Calendar, fromDateId, toDateId, useDateRange } from "@marceloterreiro/flash-calendar";
import { useQuery } from '@tanstack/react-query';
import { addMonths, differenceInDays, isBefore, isSameMonth, startOfMonth, subMonths } from 'date-fns';
import { router, useLocalSearchParams } from 'expo-router';
import { SquircleButton } from 'expo-squircle-view';
import { nanoid } from "nanoid/non-secure";
import { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';

const Property = () => {
    const { id } = useLocalSearchParams();
    const today = toDateId(new Date())
    const [calendarMonthId, setCalendarMonthId] = useState(today)


    const { data: property, isLoading } = useQuery<Property>({
        queryKey: ['property' + id],
        queryFn: async () => {
            const { data } = await client.get(`/properties/${id}`);
            return data.property;
        },
    });

    const { addItem } = useShoppingCartStore()
    const { bottom } = useSafeAreaInsets()

    const { calendarActiveDateRanges, onCalendarDayPress } = useDateRange()

    const bottomSheetRef = useRef<BottomSheet>(null)

    const snapPoints = useMemo(() => ['60%'], [])

    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior="close"
        />
    ), [])

    // Memoize expand and close handlers
    const handleExpand = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);

    const hasSelectedDates = Boolean(calendarActiveDateRanges[0]?.startId)

    const calculateDays = useCallback(() => {
        if (!calendarActiveDateRanges[0]) return 0;
        if (!calendarActiveDateRanges[0]?.startId) return 0;
        if (!calendarActiveDateRanges[0]?.endId) return 1;

        const startDate = new Date(calendarActiveDateRanges[0].startId)
        const endDate = new Date(calendarActiveDateRanges[0].endId)

        return differenceInDays(endDate, startDate) + 1
    }, [calendarActiveDateRanges])

    const handleClose = useCallback(() => {

        bottomSheetRef.current?.close();

        if (!property || !hasSelectedDates || !calendarActiveDateRanges[0]?.startId) {
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
            endDate: calendarActiveDateRanges[0].endId ?? calendarActiveDateRanges[0].startId
        }

        addItem(cartItem);
        bottomSheetRef.current?.close()

    }, [property, calendarActiveDateRanges, hasSelectedDates, calculateDays, addItem]);

    // Memoize onCalendarDayPress
    const handleCalendarDayPress = useCallback(
        (dateId: string) => {
            console.log('onCalendarDayPress called with:', dateId);
            onCalendarDayPress(dateId);
        },
        [onCalendarDayPress]
    );


    if (!property || isLoading) {
        return <LoadingIndicator />
    }

    const days = calculateDays()
    const totalPrice = days * property.price_per_night

    const nextMonth = () => {
        const month = addMonths(calendarMonthId, 1)
        setCalendarMonthId(toDateId(month))
    }

    const currentDisplayMonth = fromDateId(calendarMonthId);

    const canGoBack = !isSameMonth(currentDisplayMonth, today) && !isBefore(currentDisplayMonth, startOfMonth(today));

    const previousMonth = () => {
        if (canGoBack) {
            // const month = subMonths(calendarMonthId, 1)
            setCalendarMonthId(toDateId(subMonths(calendarMonthId, 1)))
        }
    }

    return (
        <Container>
            <Header title='Property' />
            <ScrollView className='bg-gray-100 p-4'>
                <PropertyImage
                    rating={2}
                    imageUrl={property?.images[0]}
                    isFavorite={property?.is_favorite}
                />
                <View className="flex flex-row items-center justify-between">
                    <Text variant='subtitle-primary' className='mt-4'>
                        {property.name}
                    </Text>
                    <View className="flex flex-row items-center justify-center">
                        <Ionicons name='pricetag' size={12} color={PRIMARY} />
                        <Text variant='body-primary' className='ml-2'>
                            ${property.price_per_night} per night
                        </Text>
                    </View>
                </View>
                <View className="flex flex-row items-center">
                    <Ionicons name='location' size={16} color={PRIMARY} />
                    <Text variant='body-primary'>
                        {property.city}, {property.country},
                    </Text>
                </View>
                <Text variant='body' className='text-gray-700 mt-1'>
                    {property.description}
                </Text>
                <AmenitiesList amenitites={property.amenities} />
            </ScrollView>

            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                index={-1}
                enablePanDownToClose
                enableDynamicSizing={false}
            >
                <BottomSheetView style={{ flex: 1 }}>
                    <View className="my-4 flex flex-row items-center justify-between px-4">
                        <View className="flex flex-row items-center justify-center">
                            <Ionicons name='wallet' size={24} color={PRIMARY} />
                            <Text variant="subtitle-primary" className="mx-4">
                                Price: ${hasSelectedDates ? totalPrice : property.price_per_night}
                                {!hasSelectedDates && ' per night'}
                            </Text>
                        </View>
                    </View>
                    <BottomSheetView style={{ flex: 1, paddingHorizontal: 4, position: "relative" }}>
                        <View className="mt-20 flex flex-row justify-between">
                            <Pressable
                                onPress={previousMonth}
                                disabled={!canGoBack}
                            >
                                <Ionicons name='arrow-back' size={24} color={canGoBack ? PRIMARY : 'gray'} /> </Pressable>
                            <Pressable
                                onPress={nextMonth}
                            >
                                <Ionicons name='arrow-forward' size={24} color={PRIMARY} /></Pressable>
                        </View>
                        <Calendar
                            calendarMonthId={calendarMonthId}
                            calendarActiveDateRanges={calendarActiveDateRanges}
                            calendarMinDateId={today}
                            onCalendarDayPress={handleCalendarDayPress}
                            theme={calendarTheme}
                        />
                    </BottomSheetView>
                    <SquircleButton
                        backgroundColor={PRIMARY}
                        cornerSmoothing={100}
                        onPress={handleClose}
                        preserveSmoothing
                        className='m-8 flex flex-row items-center justify-center px-4'
                        style={{
                            paddingVertical: 16,
                            position: 'absolute',
                            bottom: -120,
                            left: 0,
                            right: 0
                        }}
                    >
                        <Ionicons name="checkmark-circle" size={20} color="white" />
                        <Text variant="button" className="mx-2 text-center">
                            Confirm
                        </Text>
                    </SquircleButton>
                </BottomSheetView>
            </BottomSheet>

            <View className="bottom-0 left-0 right-0 -z-10 mx-4 mt-auto flex flex-row items-center justify-center py-2">
                <Text variant="body" className="flex-1 flex-grow text-center">
                    {hasSelectedDates ? (
                        <Pressable
                            className='mr-4'
                            onPress={handleExpand}
                        >
                            <View className="flex flex-row items-center">
                                <Ionicons name='pricetag' color={PRIMARY} size={16} />
                                <Text variant="body-primary" className="text-center">
                                    {totalPrice}
                                </Text>
                            </View>
                            <Text variant="caption" className="text-center underline">
                                {days === 1 ? '1 Night' : `${days} nights`}
                            </Text>
                        </Pressable>)
                        :
                        (
                            <Pressable className='mr-4 flex flex-row items-center'
                                onPress={handleExpand}
                            >
                                <Ionicons name='calendar-outline' size={24} color={PRIMARY} />
                                <Text variant="body-primary" className="text-center underline ml-2">
                                    Select dates
                                </Text>
                            </Pressable>
                        )
                    }
                </Text>
                <SquircleButton
                    onPress={() => {
                        toast.success("Property added to cart")
                        router.push("/checkout")
                    }}
                    className='flex-grow'
                    backgroundColor={PRIMARY}
                    borderRadius={16}
                    style={{
                        paddingVertical: 16,
                        marginVertical: 4,
                    }}
                >
                    <Text variant='button' className='text-center'>
                        Book Now
                    </Text>
                </SquircleButton>
            </View>
        </Container>
    );
};

export default Property;