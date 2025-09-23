import { Text } from '@/components';
import { useColorScheme } from '@/hooks/use-color-scheme.web';
import { format } from "date-fns";
import { SquircleView } from 'expo-squircle-view';
import { View } from 'react-native';

export const CalendarDate = ({ date = new Date() }) => {
    const colorScheme = useColorScheme();
    const month = format(date, 'MMM').toUpperCase()
    const day = format(date, 'd').toUpperCase()
    const weekday = format(date, 'EEE').toUpperCase()

    return (
        <SquircleView
            cornerSmoothing={100}
            removeClippedSubviews
            borderRadius={16}
            style={{
                paddingVertical: 4,
                paddingHorizontal: 4,
                backgroundColor: colorScheme === "dark" ? "#6b7280" : "#e2e2e2"
            }}
        >
            <View className='mx-1 flex flex-row items-center justify-center'>
                <Text variant='caption' className='text-center'>{month}</Text>
            </View>
            <View className='items-center py-2'>
                <Text variant='subtitle' className='text-center'>{day}</Text>
            </View>
            <View className='items-center py-1'>
                <Text variant='subtitle' className='text-center text-gray-500'>{weekday}</Text>
            </View>
        </SquircleView>
    )
}