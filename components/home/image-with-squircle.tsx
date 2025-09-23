import { Image, useImage } from "@shopify/react-native-skia"
import Squircle from "react-native-squircle"

type ImageWithSquircleProps = {
    image: string,
    width?: number,
    height?: number,
    borderRadius?: number
}

const ImageWithSquircle = ({ image, borderRadius = 40, width = 296, height = 280 }: ImageWithSquircleProps) => {
    const imageUrl = useImage(image);

    return (
        <Squircle
            borderRadius={borderRadius}
            style={{
                width,
                height,
                marginHorizontal: 4
            }}
            maskChildren={<Image
                width={width}
                height={height}
                image={imageUrl}
                fit={"cover"}
            />}
        />
    )
}

export default ImageWithSquircle;