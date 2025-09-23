import { AmenitiesList, Container, Header, Icon, LoadingIndicator, PropertyImage, Text } from '@/components';
import { Colors } from '@/constants/theme';
import { calendarTheme } from '@/core/theme/calendar-theme';
import { PRIMARY } from '@/core/theme/color';
import { useBottomSheetBackdropRenderer } from '@/hooks/app/use-bottom-sheet-backdrop';
import { usePropertyLogic } from '@/hooks/app/use-property-logic';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Calendar } from "@marceloterreiro/flash-calendar";
import { router } from 'expo-router';
import { SquircleButton } from 'expo-squircle-view';
import { Pressable, ScrollView, View } from 'react-native';
import { toast } from 'sonner-native';

const Property = () => {
    const {
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
    } = usePropertyLogic()

    const renderBackdrop = useBottomSheetBackdropRenderer()

    if (!property || isLoading) {
        return <LoadingIndicator />
    }

    return (
        <Container>
            <Header title='Property' />
            <ScrollView className='p-4'>
                <PropertyImage
                    rating={property.rating}
                    imageUrl={property?.images[0]}
                    isFavorite={property?.is_favorite}
                />
                <View className="flex flex-row items-center justify-between">
                    <Text variant='subtitle-primary' className='mt-4'>
                        {property.name}
                    </Text>
                    <View className="flex flex-row items-center justify-center">
                        <Icon name="pricetag" size={12} />
                        <Text variant='body-primary' className='ml-2'>
                            ${property.price_per_night} per night
                        </Text>
                    </View>
                </View>
                <View className="flex flex-row items-center">
                    <Icon name="location" size={16} />
                    <Text variant='body-primary'>
                        {property.city}, {property.country}
                    </Text>
                </View>
                <View>
                    <Text variant='body' className='text-gray-700 mt-1'>
                        {property.description}
                    </Text>
                </View>
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
                <BottomSheetView style={{ flex: 1, position: "relative", }}>
                    <BottomSheetView style={{ flex: 1, paddingHorizontal: 4, backgroundColor: Colors[colorScheme ?? "light"].background }}>
                        <View className="my-4 flex flex-row items-center justify-between px-4">
                            <View className="flex flex-row items-center justify-center">
                                <Icon name="wallet" size={24} />
                                <Text variant="subtitle-primary" className="mx-4">
                                    Price: ${hasSelectedDates ? totalPrice : property.price_per_night}
                                    {!hasSelectedDates && ' per night'}
                                </Text>
                            </View>
                        </View>
                        <View className=" flex flex-row justify-between">
                            <Pressable
                                onPress={previousMonth}
                                disabled={!canGoBack}
                            >
                                <Icon name="arrow-back" disabled={!canGoBack} size={24} />
                            </Pressable>
                            <Pressable onPress={nextMonth}>
                                <Icon name="arrow-forward" size={24} />
                            </Pressable>
                        </View>
                        <Calendar
                            calendarMonthId={calendarMonthId}
                            calendarActiveDateRanges={calendarActiveDateRanges}
                            calendarMinDateId={today}
                            onCalendarDayPress={handleCalendarDayPress}
                            theme={calendarTheme}
                        // calendarColorScheme={colorScheme}
                        />
                    </BottomSheetView>
                    <SquircleButton
                        backgroundColor={PRIMARY}
                        cornerSmoothing={100}
                        onPress={handleClose}
                        preserveSmoothing
                        className='m-8 flex flex-row items-center justify-center'
                        style={{
                            paddingVertical: 16,
                            position: 'absolute',
                            bottom: -450,
                            left: 0,
                            right: 0,

                        }}
                    >
                        <Icon name="checkmark-circle" size={20} />
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
                                <Icon name='pricetag' size={16} />
                                <Text variant="body-primary" className="text-center">
                                    {totalPrice}
                                </Text>
                            </View>
                            <View>
                                <Text variant="caption" className="text-center underline">
                                    {days === 1 ? '1 Night' : `${days} nights`}
                                </Text>
                            </View>
                        </Pressable>)
                        :
                        (
                            <Pressable className='mr-4 flex flex-row items-center'
                                onPress={handleExpand}
                            >
                                <Icon name='calendar-outline' size={24} />
                                <View>
                                    <Text variant="body-primary" className="text-center underline ml-2">
                                        Select dates
                                    </Text>
                                </View>
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