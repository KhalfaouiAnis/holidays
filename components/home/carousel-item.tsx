import { Image } from "@/components";
import { WIDTH } from "@/core/utils/layout";
import { useRef } from "react";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination } from "react-native-reanimated-carousel";

type CarouselProps = {
    property: Property;
}

const CarouselItem = ({ property }: CarouselProps) => {
    const progressValue = useSharedValue<number>(0)
    const carouselRef = useRef<ICarouselInstance>(null)

    const onPressPagination = (index: number) => {
        if (carouselRef.current) {
            carouselRef.current.scrollTo({ index, animated: true })
        }
    }

    return (
        <View>
            <Carousel
                ref={carouselRef}
                data={property.images}
                width={WIDTH - 32}
                height={320}
                autoPlay={false}
                scrollAnimationDuration={2000}
                overscrollEnabled={false}
                onProgressChange={(_, absoluteProgress) => {
                    progressValue.value = absoluteProgress;
                }}
                renderItem={({ item: imageUri }) => (
                    <View className="mx-1">
                        <Image source={imageUri} />
                    </View>
                )}
            />
            <View className="absolute bottom-4 w-full">
                <Pagination.Basic
                    onPress={onPressPagination}
                    data={property.images.map(_property => ({ color: _property }))}
                    progress={progressValue}
                    activeDotStyle={{
                        width: 16,
                        height: 8,
                        borderRadius: 4,
                        marginHorizontal: 4,
                        backgroundColor: 'white'
                    }}
                    dotStyle={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginHorizontal: 4,
                        backgroundColor: '#F3EFE9'
                    }}
                    containerStyle={{
                        paddingVertical: 8
                    }}
                />
            </View>
        </View>
    )
}

export default CarouselItem;