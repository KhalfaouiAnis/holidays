import { useRef } from "react"
import { useSharedValue } from "react-native-reanimated"
import { ICarouselInstance } from "react-native-reanimated-carousel"

export const useCarouselItem = () => {
    const progressValue = useSharedValue<number>(0)
    const carouselRef = useRef<ICarouselInstance>(null)

    const onPressPagination = (index: number) => {
        if (carouselRef.current) {
            carouselRef.current.scrollTo({ index, animated: true })
        }
    }

    const dotStyle = {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
        backgroundColor: '#F3EFE9'
    }

    const activeDotStyle = {
        width: 16,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
        backgroundColor: 'white'
    }

    return { carouselRef, progressValue, onPressPagination, dotStyle, activeDotStyle }
}