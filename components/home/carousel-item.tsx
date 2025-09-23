import { Image } from "@/components";
import { WIDTH } from "@/core/utils/layout";
import { View } from "react-native";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { useCarouselItem } from "./logic/use-carousel-item";

type CarouselProps = {
    property: Property;
}

const CarouselItem = ({ property }: CarouselProps) => {
    const { carouselRef, progressValue, onPressPagination, dotStyle, activeDotStyle } = useCarouselItem()

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
                    activeDotStyle={activeDotStyle}
                    dotStyle={dotStyle}
                    containerStyle={{
                        paddingVertical: 8
                    }}
                />
            </View>
        </View>
    )
}

export default CarouselItem;